import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Post } from '@prisma/client'
import { HomeIcon, SaveIcon} from '@heroicons/react/solid'

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
		<div className='flex justify-center m-5'>
			<div>
				<h1 className='text-white font-bold text-xl'>{session?.user?.name}</h1>
				<h1 className='text-white font-thin opacity-80 text-sm'>@{session?.user?.name}</h1>
			</div>
			<div title='home' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><HomeIcon className='w-10 text-white' onClick={() => location.href = '/dashboard'} /></div>
			<div title='save' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><SaveIcon className='w-10 text-white' onClick={updatePost} /></div>
		</div>
		<input className='bg-white outline-none border-none font-black bg-opacity-0 w-full text-center text-blue text-5xl' type="text" placeholder='type your title here' defaultValue={newTitle} onChange={e => setNewTitle(e.target.value)}/>
		<h1 className='w-full text-center text-white text-xl font-light opacity-80'>Day {post?.day || '0'}</h1>
		<textarea className='w-full h-[400px] resize-none p-20 bg-white text-white bg-opacity-0 border-none outline-none' placeholder='type your content here' defaultValue={newContent} onChange={e => setNewContent(e.target.value)} />
	</div>
}

export default Post