import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div className='grid place-content-center h-screen img-1'>
			<h1 className='text-gray text-center mb-5 font-extralight opacity-80'>@start today</h1>
			<h1 className='text-white lg:text-7xl text-6xl font-bold text-center mb-5'>Start <span className='text-blue'>Today</span></h1>
			<div className='grid place-items-center'>
				<button className='bg-gray transition-all flex justify-evenly font-medium hover:scale-110 hover:rotate-1 lg:text-base text-xl lg:w-2/3 w-full px-10 shadow-lg mt-5 py-1 rounded-md' onClick={() => signIn()}>
					<h1 className='my-auto'>Sign In With Github</h1>
				</button>
			</div>
			<h1 className='absolute bottom-0 w-full text-center text-gray font-extralight mb-5 opacity-80'>created by @limweijen ^_^</h1>
		</div>
	)
}

export default Home
