import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const session = await unstable_getServerSession(req, res, authOptions);
	if (!session) return res.status(401).json({ status: "failed: unauthorized" });
	
	// get the post
	const post = await prisma.post.findFirst({ where: { id: req.body.id } })

	// throw an error if the post doesn't exist
	if (!post) return res.status(400).json({status: 'failed: file not found'});

	// throw an error if the user isn't the author
	if (post?.authorId !== req.body.github) return res.status(400).json({status: 'failed: unauthorized access'});

	// update the post with the new title and content
	await prisma.post.update({
		where: { id: req.body.id },
		data: {
			title: req.body.title,
			content: req.body.content,
			imageURL: req.body.imageURL
		}
	});

	return res.status(200).json({status: 'success'});
}