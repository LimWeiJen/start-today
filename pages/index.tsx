import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head';

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div className='grid place-content-center h-screen img-1'>
			<Head>
				<title>Start Today</title>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
			</Head>
			<h1 className='text-gray text-center mb-5 font-extralight opacity-80 text-fade-in'>@start today</h1>
			<h1 className='text-white lg:text-7xl text-6xl font-bold text-center mb-5'>
				<span className='text-fade-in' style={{'animationDelay': '0.0s'}}>S</span> 
				<span className='text-fade-in' style={{'animationDelay': '0.1s'}}>t</span> 
				<span className='text-fade-in' style={{'animationDelay': '0.2s'}}>a</span> 
				<span className='text-fade-in' style={{'animationDelay': '0.3s'}}>r</span> 
				<span className='text-fade-in' style={{'animationDelay': '0.4s'}}>t</span> 
				<span className='text-blue'>
					<span className='text-fade-in' style={{'animationDelay': '0.5s'}}> T</span>
					<span className='text-fade-in' style={{'animationDelay': '0.6s'}}>o</span>
					<span className='text-fade-in' style={{'animationDelay': '0.7s'}}>d</span>
					<span className='text-fade-in' style={{'animationDelay': '0.8s'}}>a</span>
					<span className='text-fade-in' style={{'animationDelay': '0.9s'}}>y</span>
				</span>
			</h1>
			<div className='grid place-items-center text-fade-in'>
				<button className='bg-gray transition-all flex justify-evenly font-medium hover:scale-110 hover:rotate-1 lg:text-base text-xl lg:w-2/3 w-full px-10 shadow-lg mt-5 py-1 rounded-md' onClick={() => signIn()}>
					<h1 className='my-auto'>Sign In With Github</h1>
				</button>
			</div>
			<h1 className='absolute bottom-0 w-full text-center text-gray font-extralight mb-5 opacity-80'>created by @limweijen ^_^</h1>
		</div>
	)
}

export default Home
