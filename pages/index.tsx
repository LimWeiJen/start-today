import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'

const Home: NextPage = () => {
	const {data: session} = useSession();

	if (session) location.href = '/dashboard';

	return (
		<div>
			<button onClick={() => signIn()}>sign in</button>
		</div>
	)
}

export default Home
