import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Home: NextPage = () => {
	////// VARIABLES //////
	const {data: session} = useSession();

	////// USE EFFECTS //////
	useEffect(() => {
		// authentication
		if (session) {
			const github = session.user?.image?.replace("https://avatars.githubusercontent.com/u/", "").split("?")[0];
			if (github) {
				fetch(`https://api.github.com/user/${github}`).then(res => res.json()).then(res => {
					fetch('/api/getUserOrCreateNew', {
						method: 'POST',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
							github,
							name: res.login
						})
					}).then(res => res.json()).then(res => {
						console.log(res);
					})
				})
			}
		}
	})

	return (
		<div>
			{session?.user?.email}
			signed in as {session?.user?.name}
			<button onClick={() => signIn()}>sign in</button>
			<button onClick={() => signOut()}>sign out</button>
		</div>
	)
}

export default Home
