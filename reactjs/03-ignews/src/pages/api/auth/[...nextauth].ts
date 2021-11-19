import NextAuth from "next-auth"
import Provider from "next-auth/providers"
import { fauna } from "../../../services/fauna"
import { query as q } from "faunadb"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user"
    }),
  ],

  callbacks: {
    async signIn (user, account, profile){
      const { email } = user

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("users_by_email"),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection("users"),
              {data: {email}}
            ),
            q.Get(
              q.Match(
                q.Index("users_by_email"),
                q.Casefold(user.email)
              )
            )
          )
        )
        return true
      } catch {
        return false
      }

      
    }
  }
})