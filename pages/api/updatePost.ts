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
	console.log(post?.authorId);
	console.log(req.body.github);
	if (post?.authorId === req.body.github) {
		await prisma.post.update({
			where: {
				id: req.body.id
			},
			data: {
				title: req.body.title,
				content: req.body.content,
			}
		});
		return res.status(200).json({post});
	}
	return res.status(400).json({error: 'file not found'});
}