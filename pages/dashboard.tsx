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

	return <div>
		<div className='bg-gray bg-opacity-10 flex justify-evenly m-5 rounded-md p-3'>
			<button className='bg-gray px-6 py-2 rounded-full transition-all hover:shadow-2xl bg-opacity-70 hover:scale-110 hover:rotate-1' onClick={createNewPost}>Create New Post</button>
			<h1 className='bg-blue text-xl shadow-2xl font-bold text-dark-blue bg-opacity-80 rounded-full px-6 py-2'>{session?.user?.name}</h1>
			<button className='bg-gray px-6 py-2 rounded-full transition-all hover:shadow-2xl bg-opacity-70 hover:scale-110 hover:rotate-1' onClick={() => signOut().then(() => location.href = '/')}>Sign Out</button>
		</div>
		<div className='m-5'>
			{user?.posts.map((post, i) => <div key={post.id} className="flex justify-between border-gray transition-all hover:shadow-2xl hover:bg-gray hover:text-dark-blue text-gray border-2 rounded-lg p-3 m-3">
					<Link href={`/post/${post.id}`}>
						<h1 className='hover:cursor-pointer text-2xl grid place-content-center'>Day {post.day} - {post.title}</h1>
					</Link>
					<button className='hover:bg-dark-blue hover:text-gray p-3 rounded-lg transition-all' onClick={() => deletePost(post.id)}>Delete</button>
				</div>
			)}
		</div>
	</div>
}

export default Dashboard