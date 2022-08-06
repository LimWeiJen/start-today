import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Post } from '@prisma/client'

const Post = () => {
	////// VARIABLES //////
	const postId = useRouter().query.postId as string
	const {data: session} = useSession();
	const [post, setPost] = useState<Post>();
	const [newTitle, setNewTitle] = useState("");
	const [newContent, setNewContent] = useState("");

	////// USE EFFECTS //////
	useEffect(() => {
		if (post) return;
		fetch('/api/getPost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: postId,
				github: session?.github
			})
		}).then(res => res.json()).then(res => {
			if (res.status === "success") {
				setPost(res.post);
				setNewTitle(res.post.title);
				setNewContent(res.post.content);
			}
		});
	})

	////// FUNCTIONS //////
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
		}).then(res => res.json()).then(res => {
			if (res.status === "success") location.href = "/dashboard";
		})
	}

	return <div>
		<div>
			<div>
				<div>
					<input type="text" placeholder='type your title here' defaultValue={newTitle} onChange={e => setNewTitle(e.target.value)}/>
					<h1>Day {post?.day || '1'}</h1>
				</div>
				<div>
					<textarea placeholder='type your content here' defaultValue={newContent} onChange={e => setNewContent(e.target.value)} />
					<button onClick={updatePost}>Update Post</button>
				</div>
			</div>
		</div>
	</div>
}

export default Post