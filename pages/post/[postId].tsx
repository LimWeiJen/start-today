import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { HomeIcon, SaveIcon} from '@heroicons/react/solid'

const Post = ({post}: any) => {
	////// VARIABLES //////
	const postId = useRouter().query.postId as string
	const {data: session} = useSession();
	const [newTitle, setNewTitle] = useState(post.title);
	const [newContent, setNewContent] = useState(post.content);
	const [loading, setLoading] = useState(false);

	////// FUNCTIONS //////
	const updatePost = () => {
		setLoading(true);
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

	return <div className='img-2'>
		<div className='flex lg:justify-center justify-between m-5'>
			<div>
				<h1 className='text-white font-bold text-xl'>{session?.user?.name}</h1>
				<h1 className='text-white font-thin opacity-80 text-sm'>@{session?.user?.name}</h1>
			</div>
			<div className='flex'>
				<div title='home' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><HomeIcon className='w-10 text-white' onClick={() => location.href = '/dashboard'} /></div>
				{loading ? 
					<div className="loading"></div>:	
					<div title='save' className='mx-1 transition-all hover:scale-110 hover:cursor-pointer hover:rotate-3'><SaveIcon className='w-10 text-white' onClick={updatePost} /></div>}
			</div>
		</div>
		<input className='bg-white lg:m-0 mx-5 outline-none border-none font-black bg-opacity-0 w-full lg:text-center text-blue lg:text-5xl text-xl' type="text" placeholder='type your title here' defaultValue={newTitle} onChange={e => setNewTitle(e.target.value)}/>
		<h1 className='w-full lg:m-0 mx-5 lg:text-center text-white lg:text-xl text-lg font-light opacity-80'>Day {post?.day || '0'}</h1>
		<textarea className='w-full h-[600px] lg:h-[400px] resize-none lg:p-20 p-5 bg-white text-white bg-opacity-0 border-none outline-none' placeholder='type your content here' defaultValue={newContent} onChange={e => setNewContent(e.target.value)} />
	</div>
}

export async function getServerSideProps({req, query}: any) {
	const session = await getSession({ req });

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const res = await fetch('https://start-today.vercel.app/api/getPost', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			id: query.postId as string,
			github: session?.github,
			secret: process.env.SECRET
		})
	});
	const data = await res.json();

	return {
		props: {
			post: data.post
		}
	}
}

export default Post