import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Post } from '@prisma/client'
import Link from 'next/link';
import { PlusIcon, LogoutIcon, TrashIcon, SearchIcon } from '@heroicons/react/solid';
import { getSession } from 'next-auth/react';

const Dashboard = ({user}: any) => {
	////// VARIABLES //////
	const [posts, setPosts] = useState<Array<Post>>(user.posts);
	const {data: session} = useSession();
	const [loading, setLoading] = useState(false);

	////// FUNCTIONS //////
	const createNewPost = () => {
		setLoading(true);
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

	const _searchPost = (keyword: string) => {
		if (!keyword) setPosts(user?.posts!);
		else setPosts([...posts.filter(post => ("day " + post.day.toString() + " - " + post.title.toLowerCase()).includes(keyword.toLowerCase()))]);
	}

	return <div>
		<div className='img-2'></div>
		<div className='flex lg:justify-center justify-between m-5'>
			<div>
				<h1 className='text-white font-bold text-xl'>{session?.user?.name}</h1>
				<h1 className='text-white font-thin opacity-80 text-sm'>@{session?.user?.name}</h1>
			</div>
			<div className='flex'>
				{loading ? 
				<div className="loading mx-3"></div> : 
				<div title='add new post' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><PlusIcon className='w-10 text-white' onClick={createNewPost} /></div>}
				<div title='sign out' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><LogoutIcon className='w-10 text-white' onClick={() => signOut().then(() => location.href = '/')} /></div>
			</div>
		</div>
		<div className='lg:mx-20 mx-5 bg-white bg-opacity-50 p-1 pl-3 rounded-xl flex mb-12'>
			<div title='search' className='mx-1'><SearchIcon className='text-white w-6'/></div>
			<input type="text" onChange={e => _searchPost(e.target.value)} className='w-full bg-white bg-opacity-0 text-white outline-none border-none'/>
		</div>
		<div className='lg:px-40'>
			{posts.sort((a, b) => b.day - a.day).map((post, i) => <div key={post.id} className='flex w-full mx-1 py-3'>
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

export async function getServerSideProps({req}: any) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const res = await fetch('https://start-today.vercel.app/api/getUserOrCreateNew', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			github: session?.github,
			name: session?.userName,
			secret: process.env.SECRET
		})
	});
	const data = await res.json();

	return {
		props: {
			user: data
		}
	}
}

export default Dashboard