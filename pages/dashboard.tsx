import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { User, Post } from '@prisma/client'
import Link from 'next/link';

const Dashboard = () => {
	////// VARIABLES //////
	const [user, setUser] = useState<User & {posts: Array<Post>}>();
	const {data: session} = useSession();

	////// USE EFFECTS //////
	useEffect(() => {
		if (!session) return;

		// on load, get user data
		fetch('/api/getUserOrCreateNew', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				github: session?.github,
				name: session?.userName
			})
		}).then(res => res.json()).then(res => setUser(res));
	})

	////// FUNCTIONS //////
	const createNewPost = () => {
		fetch('/api/createNewPost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				github: session?.github,
				title: "",
				content: "",
				day: _diffBtwDates(user?.createdAt, new Date())
			})
		}).then(res => res.json()).then(res => {
			if (res.status === "success") location.href = `/post/${res.postId}`
		});
	}

	const deletePost = (postId: string) => {
		fetch('/api/deletePost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: postId,
				github: session?.github
			})
		}).then(res => res.json()).then(res => { 
			if (res.status === "success") location.href = "/dashboard"
		 })
	}

	////// PRIVATE FUNCTIONS //////
	const _diffBtwDates = (date1: Date | undefined, date2: Date) => {
		if (!date1) return 0;
		const diff = Math.abs(date2.getTime() - new Date(date1).getTime());
		return Math.ceil(diff / (1000 * 3600 * 24));
	}

	return <div className='grid-container'>
		<div className='ceiling animate-[fade-in_2s]'></div>
		<div className='top-left animate-[fade-in_3s] text-gray grid place-content-center text-4xl underline'>{session?.user?.name}</div>
		<div className='top-right flex flex-col text-white p-8 animate-[fade-in_2.5s]'>
			{user?.posts.map((post, i) => <div key={post.id} className={`flex justify-between m-1 border-gray rounded-xl border-2 p-1 text-xl font-medium`}>
					<Link href={`/post/${post.id}`}>
						<h1 className='hover:cursor-pointer hover:underline'>Day {post.day} - {post.title}</h1>
					</Link>
					<button className='p-1 font-normal text-gray transition-all rounded-xl hover:bg-gray hover:text-dark-blue' onClick={() => deletePost(post.id)}>Delete</button>
				</div>
			)}
		</div>
		<div className='bottom-left flex flex-col justify-evenly animate-[fade-in_3.5s]'>
			<button className='bg-gray text-black p-1 transition-all hover:bg-dark-blue hover:text-gray' onClick={() => signOut().then(() => location.href = '/')}>Sign Out</button>
			<button className='bg-gray text-black p-1 transition-all hover:bg-dark-blue hover:text-gray' onClick={createNewPost}>Create New Post</button>
		</div>
	</div>
}

export default Dashboard