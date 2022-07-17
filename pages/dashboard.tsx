import React, { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { User } from '@prisma/client'

const Dashboard = () => {
	const [user, setUser] = useState<User>();
	const {data: session} = useSession();

	useEffect(() => {
		fetch('/api/getUserOrCreateNew', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				github: session?.github,
				name: session?.userName
			})
		}).then(res => res.json()).then(res => setUser(res));
	})

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
		})
	}

	const _diffBtwDates = (date1: Date | undefined, date2: Date) => {
		if (!date1) return 0;
		const diff = Math.abs(date2.getTime() - new Date(date1).getTime());
		return Math.ceil(diff / (1000 * 3600 * 24));
	}

	return <div>
		Dashboard
		{user?.name}
		<button onClick={createNewPost}>Create New Post</button>
	</div>
}

export default Dashboard