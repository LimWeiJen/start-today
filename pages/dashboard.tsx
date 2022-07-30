import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { User, Post } from '@prisma/client'

const Dashboard = () => {
	////// VARIABLES //////
	const [user, setUser] = useState<User & {posts: Array<Post>}>();
	const {data: session} = useSession();

	////// USE EFFECTS //////
	useEffect(() => {
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
		}).then(res => res.json()).then(res => { location.href = `/post/${res.postId}` });
	}

	const deletePost = (postId: string) => {
		fetch('/api/deletePost', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				id: postId,
				github: session?.github
			})
		}).then(res => res.json()).then(res => { location.href = "/dashboard" })
	}

	////// PRIVATE FUNCTIONS //////
	const _diffBtwDates = (date1: Date | undefined, date2: Date) => {
		if (!date1) return 0;
		const diff = Math.abs(date2.getTime() - new Date(date1).getTime());
		return Math.ceil(diff / (1000 * 3600 * 24));
	}

	return <div>
		Dashboard
		{user?.name}
		<button onClick={() => signOut()}>Sign Out</button>
		<button onClick={createNewPost}>Create New Post</button>
		<div>
			<h3>Posts</h3>
			{user?.posts.map(post => <div key={post.id}>
				{post.title}
				<button onClick={() => deletePost(post.id)}>delete post</button>
			</div>)}
		</div>
	</div>
}

export default Dashboard