import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
	////// VARIABLES //////
	const {data: session} = useSession();
	const [user, setUser] = useState<any>();

	////// USE EFFECTS //////
	useEffect(() => {
		// authentication
		if (session) {
			fetch('/api/getUserOrCreateNew', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({
					github: session.github,
					name: session.userName
				})
			}).then(res => res.json()).then(res => setUser(res));
		}
	})

	return (
		<div>
			{user?.name}
			<button onClick={() => signIn()}>sign in</button>
			<button onClick={() => signOut()}>sign out</button>
		</div>
	)
}

export default Home
