

27/05/2025

package.json. Add this scrip to avoind problem with React
  "packageManager":"npm@10.5.2",
  "overrides": {
    "react": "$react",
    "react-dom": "react-dom"
  },
* This is recomended in the tutorial nevertheless it gave me an error so I deleted this scipt


1. Install the npm package in the Terminal

npm install next-auth@beta
npx auth secret
* This creae .env file

2. Set up the setting in my github. Follow the documentation.

Example:
https://example.com/api/auth/callback/github

Apllied
https://localhost:3000/api/auth/callback/github

3. Add github id and github secret to .env file
 

4. Create file <auth.ts> on the root of the app:

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
})

5. Create the file <route.ts> inside the following folders: api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers

6. Create a folder to organize the app (root)

7. Create <pagetsx.> at the roor of the app:

export default function Home() {
  return (
    <>
    <h1 className="text-2xl">HOME</h1>
    </>
  );
}



8. Create <layout.tsx>

import Navbar from "./components/Navbar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="font-work-sans">
            <Navbar/>
            {children}
        </main>
    );
  }

  * This will render the <navbar> and all the components (children)


9. Create the navbar as acomponent inside the components folder. src/app/(root)/components/Navbar.tsx

import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/next.svg" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                </button>
              </form>

              <Link href={`/user/${session?.user?.id}`}>
              <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

* Here a I had a lot of issues:

- components folder was not inside root folder and I could call it from Layout

Then i had a shit lot of problems to configure the setting in github, especially in the call back url, I had http://localhost/3000 instead of http://localhost/3000. That was dumb!

It is very interesting how the 'use server' with a arrow async function and <await> to use singin and singout builtin function from <authjs> 

This might look confusing but once I read the official docs, it makes perfect sense

https://authjs.dev/getting-started/authentication/oauth

the end