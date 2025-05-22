# Nextjs

Next.js 15 Crash Course | Build and Deploy a Production-Ready Full Stack App

<https://www.youtube.com/watch?v=Zq5fmkH0T78>

In Next.js, the components are server side by default

npx create-next-app@latest

# 22/05/2025

Create a client component. It is needed to use the directive
'use client'

example src/app/components/hello.tsx:

'use client'

export default function Hello(){
    console.log("I am a client component");

    return(
        <div>
            <h1>Hello</h1>
        </div>
    )
}

 Then import th component just like i do with React

 src/app/page.tsx:

 import Hello from "./components/hello";

export default function Home() {
  console.log("what am I... server or component?")
  return (
    <div>
    (...)
      <Hello/>
    </div>
  );
}

>
 # Lesson 2. Routes

# 22/05/2025

<Routes>
* snipet to creat a basic function
<rafce

1. Create about Page, in order to organize the app structure we can create a folder within () so it won't show in the route, ex

src/app/(root)/about

Create a dynamic route for a dashboard.

Create a folder <dashbooard>, within 2 folders: <analytics> and <users>

Create a page.tsx inside users

create a folder inside users: [id]. This is used for the dynamic routes

src/app/users/[id]/page.tsx"

const page = ({params}:{params: {id: string}}) => {
    const {id} = params;
  return (
    <div>
        <h1 className='text-3xl'>User profile {id}</h1>
    </div>
  )
}

export default page

****

- the name of the params should match the name of the folder

src/app/users/page.tsx

import Link from "next/link"

const page = () => {
    return (
      <div>
        <h1>Dashboard users</h1>
        <ul className="mt-10">
            <li>
                <Link href="/dashboard/users/1">User 1</Link>
            </li>
            <li>
                <Link href="/dashboard/users/2">User 2</Link>
            </li>
            <li>
                <Link href="/dashboard/users/3">User 3</Link>
            </li>
            <li>
                <Link href="/dashboard/users/4">User 4</Link>
            </li>
        </ul>
      </div>
    )
  }
  
  export default page

Explanation:

Link is a feature of Next that makes the applying of dynamic routes very easy. Just create a folder inside [] that will act as a component to display the info depending on the id.

The path start at the root (app)

# Lesson 3. Layouts

## 22/05/2025

- Layout

RootLayout is the mos important component coz render the wholle app. Whatever that is add to this file as return, it will show in all pages

We can also create a layout.tez file to style a particilar file or files. All files under that folder, will be afected by this styling

-Route groups

Wrap the folder with () and so we don't need to add this folder name in the URL. Now it looks like this

<http://localhost:3000/users>

Without the (), then it look like this:
<http://localhost:3000/dashboard/users>

# Lesson 4. Error handling