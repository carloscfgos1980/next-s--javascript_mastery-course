## 22/05/2025

Lesson 4. Errors

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

* This code I just copied from Nextjs official website

****

then to tryout I throw an error in a component under root tree:

  // throw new Error("NOT IMPLEMENTED")


The end