import NextAuth from "next-auth";
import { authProviderOpptions } from "./option";

const handler = NextAuth(authProviderOpptions);

export { handler as GET, handler as POST }