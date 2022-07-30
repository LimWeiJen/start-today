import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
	// find the user
	let user = await prisma.user.findFirst({ 
		where: { github: req.body.github },
		include: { posts: true }
	})

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