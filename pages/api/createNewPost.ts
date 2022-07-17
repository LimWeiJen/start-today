// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await prisma.user.update({
		where: {
			github: req.body.github
		},
		data: {
			posts: {
				create: {
					title: req.body.title,
					content: req.body.content,
					day: req.body.day,
				}
			}
		}
	})
	return res.status(200).json({ message: 'success' });
}