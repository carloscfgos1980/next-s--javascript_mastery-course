# Nextjs

Next.js 15 Crash Course | Build and Deploy a Production-Ready Full Stack App

<https://www.youtube.com/watch?v=Zq5fmkH0T78>

In Next.js, the components are server side by default

npx create-next-app@latest

# Lesson 1
22/05/2025

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

22/05/2025

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

# Lesson 3

22/05/2025

- Layout

RootLayout is the mos important component coz render the wholle app. Whatever that is add to this file as return, it will show in all pages

We can also create a layout.tez file to style a particilar file or files. All files under that folder, will be afected by this styling

-Route groups

Wrap the folder with () and so we don't need to add this folder name in the URL. Now it looks like this

<http://localhost:3000/users>

Without the (), then it look like this:
<http://localhost:3000/dashboard/users>

the end

# Lesson 4. Errors

22/05/2025

I applied error bubling and global error. The second didn't work quite well but first did and that is enough for now

rsc/app/(root)/about/error.tsx:

'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div>
      <h2 className='text-red-900'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

- This code I just copied from Nextjs official website

****

then to tryout I throw an error in a component under root tree:

  // throw new Error("NOT IMPLEMENTED")

The end

# lesson 5. Fetching

22/05/2025

Server side rendering

src/app/(root)/about.tsx

export default async function Home() {
  const response = await fetch('<https://jsonplaceholder.typicode.com/albums>');
  if(!response.ok) throw new Error("Failed to fetch the data")

  const albums = await response.json()

  return (
    <div className="grid grid-cols-1 sm:grid grid-cols-2 md:grid-cols">
      <h1>Welcome to Nextjs</h1>

      {albums.map((album: {id:number, title:string}) => (
        <div 
        key={album.id}
        className="bg-white shadow-md rounded-lg p-4"
        >
          <h3 className="text-lg font-boldmv-2">{album.title}</h3>
          <p className="text-gray-600">Album ID: {album.id}</p>
        </div>
      ))}
  
    </div>
  );
}

N: I am a bit rusty. I was confused where the object with ok property came from, then I realize it is almbums constant. It almost like react combined with expressjs

The end

# Lesson 6 SSR fetching

23/05/2025

1. Creae api folder for the server function

- Create a dummy database
src/app/api/books/db.ts

type Books = {
    id: number;
    name: string;
}[]

const books: Books = [
    {id: 1, name: "Atomic habits"},
    {id: 2, name: "Deep work"},
    {id: 3, name: "The seven habits of highly Effective People"}
];

export default books;

2. create a route for GET and POST

src/app/api/books/route.ts

import books from "@/app/api/db";

export async function GET() {
    console.log("books:", books)
    return Response.json(books);
}

export async function POST(request: Request) {
    const book = await request.json()
    books.push(book);

    return Response.json(books);
}

3. Add funcionality for PUT and DELETE

src/app/api/books/[id]/route.ts

import books from "@/app/api/db";

export async function PUT(
    request: Request,
    context: {params: {id: string}},
){
    const id = +context.params.id;
    const book = await request.json();

    const index = books.findIndex((b)=> b.id === id);
    books[index] = book;

    return Response.json(books)
};

export async function DELETE (
    request: Request,
    context: {params: {id: string}},
){
    const id = +context.params.id;

    const index = books.findIndex((b)=> b.id === id);
    books.splice(index, 1);

    return Response.json(books);
}

4. SSR fetching

src/app/(root)/books/page.tsx

export default async function Page() {
    const response = await fetch('<http://localhost:3000/api/books>');
    if(!response.ok) throw new Error("Failed to fetch the data")
  
    const books = await response.json()
  
    return (
      <div className="grid grid-cols-1 sm:grid grid-cols-2 md:grid-cols">
        <h1>Welcome to Nextjs</h1>
  
        {books.map((book: {id:number, name:string}) => (
          <div 
          key={book.id}
          className="bg-white shadow-md rounded-lg p-4"
          >
            <h3 className="text-lg font-boldmv-2">{book.name}</h3>
            <p className="text-gray-600">Book ID: {book.id}</p>
          </div>
        ))}
    
      </div>
    );
  }
  
  N: I had a bug that I couldn't figure it out. I think it was due I tryied to fect with <await> and that screw up the app. something with the CPU and memory leaking... I guess.. it is working now!

  the end
