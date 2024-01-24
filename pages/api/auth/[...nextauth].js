import spotifyApi,{ LOGIN_URL } from "@/lib/spotify"
import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"


async function refreshAcessToken(token) {
  try {

    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const {body : refreshedToken} = await spotifyApi.refreshAccessToken();

    console.log("refeshed token is ", refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires : Date.now() + refreshedToken.expires_in*1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }

    
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshTokenError'
    }
  }
}
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({token, account, user}) {
      //initial signin

      if(account && user) {
        return {
          ...token,
          accessToken:account.access_token,
          refreshToken: account.refresh_token,
          userName: account.providerAccountId,
          accessTokenExpires : account.expires_at* 1000
        }
      }

      //token not expired yet


      if(Date.now() < token.accessTokenExpires) {
        console.log("token not expired")
        return token;
      }


      console.log("token expired and generating new")



      return await refreshAcessToken(token);
    },
    async session ({session,token}) {

      //session obj is accessible to user. copying valiues here
      session.user.accessToken =token.accessToken;

      session.user.refreshToken = token.refreshToken;
      session.user.userName = token.userName;
      session.user.image = token.picture;

      return session;
    }
  }
}

export default NextAuth(authOptions)