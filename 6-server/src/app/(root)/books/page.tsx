
type Books = {
    id: number;
    name: string;
}[]

async function Page () {
    const response = await fetch("http://localhost:3000/api/books", {
        next: { revalidate: 10 },
      });
    if(!response.ok) throw new Error("Failed to fetch the data")

    const books:Books = await response.json()
    console.log("books:", books)

    return (
        <div className="grid grid-cols-1 sm:grid grid-cols-2 md:grid-cols">
          <h1>Welcome to Nextjs</h1>
    
          {/* {books.map((book: {id:number, name:string}) => (
            <div 
            key={book.id}
            className="bg-white shadow-md rounded-lg p-4"
            >
              <h3 className="text-lg font-boldmv-2">{book.name}</h3>
              <p className="text-gray-600">Book ID: {book.id}</p>
            </div>
          ))} */}
      
        </div>
      );
}

export default Page;