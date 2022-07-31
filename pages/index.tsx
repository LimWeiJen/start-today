import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div className='grid-container'>
			<div className='ceiling animate-[fade-in_2s]'></div>
			<div className='top-left animate-[fade-in_3s] text-gray grid place-content-center text-4xl underline'>User</div>
			<div className='top-right flex flex-col justify-center pl-10 animate-[fade-in_2.5s]'>
				<h1 className='text-gray text-6xl animate-[text-fade-in_2s_ease-in-out]'>HAB journal</h1>
				<h1 className='text-blue text-6xl animate-[text-fade-in_2s_ease-in-out]'>log in</h1>
				<button className='bg-gray text-black p-3 mt-5 mr-5' onClick={() => signIn()}>
					log in with github
				</button>
			</div>
			<div className='bottom-left animate-[fade-in_3.5s]'></div>
		</div>
	)
}

export default Home
