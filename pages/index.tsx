import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

const Home: NextPage = () => {
	////// VARIABLES //////
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div>
			<button onClick={() => signIn()}>sign in</button>
		</div>
	)
}

export default Home
