import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// get the post
	const post = await prisma.post.findFirst({ where: { id: req.body.id } })

	// throw an error if the post doesn't exist or if the user isn't the author
	if (post?.authorId === req.body.github) return res.status(400).json({error: 'file not found'});
	
	// delete the post
	await prisma.post.delete({ where: { id: req.body.id } });

	return res.status(200).json({status: "success"});
}