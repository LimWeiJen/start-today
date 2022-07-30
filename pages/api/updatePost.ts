import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// get the post
	const post = await prisma.post.findFirst({ where: { id: req.body.id } })

	// throw an error if the post doesn't exist or if the user isn't the author
	if (post?.authorId !== req.body.github) return res.status(400).json({error: 'file not found'});

	// update the post with the new title and content
	await prisma.post.update({
		where: { id: req.body.id },
		data: {
			title: req.body.title,
			content: req.body.content,
		}
	});

	return res.status(200).json({post});
}