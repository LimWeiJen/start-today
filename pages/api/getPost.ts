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

	console.log(post.authorId);
	console.log(req.body.github);
	console.log(req.body.id)

	// throw an error if the user isn't the author
	if (post?.authorId !== req.body.github) return res.status(401).json({status: 'failed: unauthorized'});
	
	return res.status(200).json({
		status: 'success',
		post
	});
}