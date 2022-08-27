import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<User | any>) {
	if (req.body.secret === process.env.SECRET) {
		return res.status(200).json({ status: "testing" })
	}
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session && req.body.secret !== process.env.SECRET) return res.status(401).json({ status: "failed: unauthorized" });

	// find the user
	let user = await prisma.user.findFirst({ 
		where: { github: req.body.github },
		include: { posts: true }
	})

	console.log(user);

	// if the user doesn't exist, create one
	if (!user) user = await prisma.user.create({
		data: {
			name: req.body.name,
			github: req.body.github,
		},
		include: { posts: true }
	})

	return res.status(200).json(user);
}