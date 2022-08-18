import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { useSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {data: session} = useSession();

	// get the post
	const post = await prisma.post.findFirst({ where: { id: req.body.id } })

	if (!session) return res.status(400).json({status: 'failed: not logged in'});

	// throw an error if the post doesn't exist
	if (!post) return res.status(400).json({status: 'failed: file not found'});

	// throw an error if the user isn't the author
	if (post?.authorId !== session?.github) return res.status(400).json({status: 'failed: unauthorized access'});
	
	return res.status(200).json({
		status: 'success',
		post
	});
}