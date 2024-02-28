// import CredentialsProvider from "next-auth/providers/credentials";
// import GitHubProvider from "next-auth/providers/github";

// const options = {
//   providers: [
//     // GitHubProvider({
//     //   clientId: process.env.GITHUB_ID,
//     //   clientSecret: process.env.GITHUB_SECRET,
//     // }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username: ",
//           type: "text",
//           placeholder: "your username",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "password",
//         },
//       },
//       async authorize(credentials) {
//         // RETRIEVE USER DATA FROM HERE TO VERIFY WITH CREDENTIALS
//         //DOCS: https://next-auth.js.org/configuration/providers/credentials
//         const user = {
//           id: "42",
//           name: "TestUser",
//           password: "password",
//         };
//         if (credentials?.username === user.name && credentials?.password === user.password) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
// };
// export default options;
