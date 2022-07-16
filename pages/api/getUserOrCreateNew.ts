// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
	const user = await prisma.user.findFirst({
		where: {
			github: req.body.github
		}
	})
	if (user) return res.status(200).json(user);
	const newUser = await prisma.user.create({
		data: {
			name: req.body.name,
			github: req.body.github,
		}
	})
	return newUser;
}