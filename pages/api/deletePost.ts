// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const post = await prisma.post.findFirst({
		where: {
			id: req.body.id
		}
	})
	if (post?.authorId === req.body.github) {
		await prisma.post.delete({
			where: {
				id: req.body.id,
			}
		})
		return res.status(200).json({status: "success"});
	}
	return res.status(400).json({error: 'file not found'});
}