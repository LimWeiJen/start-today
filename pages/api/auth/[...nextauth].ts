import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		})
	],
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin
			if (account) token.accessToken = account.access_token;
			return token
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token from a provider.
			const github = session.user?.image?.replace("https://avatars.githubusercontent.com/u/", "").split("?")[0];
			const userName = await fetch(`https://api.github.com/user/${github}`).then(res => res.json()).then(res => res.login);
			session.github = github;
			session.userName = userName;
			return session
		}
	},
	secret: process.env.SECRET!,
}

export default NextAuth(authOptions);