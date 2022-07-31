import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// create a new post
	const newPost = await prisma.post.create({
		data: {
			title: req.body.title,
			content: req.body.content,
			authorId: req.body.github,
			day: req.body.day
		}
	});
	
	return res.status(200).json({ 
		status: 'success',
		postId: newPost.id
	});
}