import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const { NEXTAUTH_URL } = process.env;

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Festival Fuel",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      // The method that allows us to connect to the backend.
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const endpoint = NEXTAUTH_URL + `/api/v1/login`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        };

        const response = await fetch(endpoint, options);
        const user = await response.json();

        if (response.status === 200 && user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          userId: user.userId,
          role: user.role,
        };
      }

      return token;
    },
    async session({ session, token }) {
      session.userId = token.userId;
      session.role = token.role;

      return session;
    },
  },
  session: {
    maxAge: 2 * 24 * 60 * 60,
  },
  //   pages: {
  //     signIn: "/signin",
  //   },
  secret: process.env.JWT_SECRET,
  debug: process.env.NODE_ENV === "development",
});
