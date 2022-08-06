import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div className='grid place-content-center h-screen'>
			<h1 className='text-gray text-center'>@day one</h1>
			<h1 className='text-gray text-7xl font-bold text-center'>Day One</h1>
			<button className='bg-white bg-opacity-10 transition-all hover:scale-110 hover:rotate-1 shadow-lg mt-5 p-3 rounded-md' onClick={() => signIn()}>
				log in with github
			</button>
			<h1 className='absolute bottom-0 w-full text-center text-gray font-thin mb-5'>created by @limweijen ^_^</h1>
		</div>
	)
}

export default Home
