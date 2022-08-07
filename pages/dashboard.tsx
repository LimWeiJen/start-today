import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { User, Post } from '@prisma/client'
import Link from 'next/link';
import { PlusIcon, LogoutIcon, HomeIcon, TrashIcon, SearchIcon } from '@heroicons/react/solid';

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

	return <div>
		<div className='flex justify-center m-5'>
			<div>
				<h1 className='text-white font-bold text-xl'>{session?.user?.name}</h1>
				<h1 className='text-white font-thin opacity-80 text-sm'>@{session?.user?.name}</h1>
			</div>
			<div title='add new post' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><PlusIcon className='w-10 text-white' onClick={createNewPost} /></div>
			<div title='sign out' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><LogoutIcon className='w-10 text-white' onClick={() => signOut().then(() => location.href = '/')} /></div>
		</div>
		<div className='mx-20 bg-white bg-opacity-50 p-1 pl-3 rounded-xl flex mb-12'>
			<div title='search' className='mx-1'><SearchIcon className='text-white w-6'/></div>
			<input type="text" className='w-full bg-white bg-opacity-0 text-white outline-none border-none'/>
		</div>
		<div className='mx-40'>
			{user?.posts.map((post, i) => <div key={post.id} className='flex w-full mx-1 my-5'>
				<Link href={`/post/${post.id}`}>
					<div className='flex-1 hover:cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.03] text-white flex bg-black rounded-xl bg-opacity-70'>
						<h1 className='p-3 grid place-content-center'>Day {post.day} - {post.title}</h1>
					</div>
				</Link>
				<div title='delete' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><TrashIcon className='w-10 text-gray' onClick={() => deletePost(post.id)} /></div>
			</div>
			)}
		</div>
	</div>
}

export default Dashboard