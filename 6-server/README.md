## Lesson 6 SSR fetching

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
