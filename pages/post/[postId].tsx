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
		<div className='grid-container'>
			<div className='ceiling animate-[fade-in_2s]'></div>
			<div className='top-left animate-[fade-in_3s]'></div>
			<div className='top-right flex'>
				<div className='flex-[0.3]'>
					<input className='bg-dark-blue text-white text-4xl outline-none w-fit' type="text" placeholder='type your title here' defaultValue={newTitle} onChange={e => setNewTitle(e.target.value)}/>
					<h1 className='text-white text-4xl'>Day {post?.day || '1'}</h1>
				</div>
				<div className='flex flex-col w-full p-10'>
					<textarea className='h-full p-3 rounded-xl bg-dark-blue outline-none border-2 text-white border-gray' placeholder='type your content here' defaultValue={newContent} onChange={e => setNewContent(e.target.value)} />
					<button className='text-gray w-fit p-1 mt-1 transition-all rounded-xl hover:bg-gray hover:text-dark-blue' onClick={updatePost}>Update Post</button>
				</div>
			</div>
			<div className='bottom-left animate-[fade-in_3.5s]'></div>
		</div>
	</div>
}

export default Post