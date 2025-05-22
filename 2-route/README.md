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