import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Post } from '@prisma/client'

const Post = () => {
	const postId = useRouter().query.postId as string
	const {data: session} = useSession();
	const [post, setPost] = useState<Post>();
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");

	useEffect(() => {
		if (post) return
		fetch('/api/getPost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: postId,
				github: session?.github
			})
		}).then(res => res.json()).then(res => {
			setPost(res.post);
			setNewTitle(res.post.title);
			setNewContent(res.post.content);
		}).catch(err => {
			console.log(err);
		})
	})

	const updatePost = () => {
		console.log(newTitle, newContent);
		fetch('/api/updatePost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: postId,
				github: session?.github,
				title: newTitle,
				content: newContent
			})
		})
	}

	return <div>
		{postId}
		{post ? post.day : "Loading..."}
		<input type="text" defaultValue={newTitle} onChange={e => setNewTitle(e.target.value)}/>
		<textarea defaultValue={newContent} onChange={e => setNewContent(e.target.value)} />
		<button onClick={updatePost}>Update Post</button>
	</div>
}

export default Post