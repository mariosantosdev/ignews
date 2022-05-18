import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";

import { fauna } from "@services/fauna";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization:
        "https://github.com/login/oauth/authorize?scope=read:user+user:email",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const { email } = user;

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(q.Index("index_by_email"), q.Casefold(user.email))
              )
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("index_by_email"), q.Casefold(user.email)))
          )
        );

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
