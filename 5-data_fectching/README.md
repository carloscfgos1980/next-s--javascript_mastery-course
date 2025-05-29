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

#