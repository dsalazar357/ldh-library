import prisma from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  const rituals = await prisma.ritual.findMany();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Library Users
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            {user.username}
          </li>
        ))}
      </ol>
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Rituals
      </h1>
      <div className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {rituals.map((ritual) => (
          <div key={ritual.id}>
            <ul className="mb-2">
              <li>{ritual.title}</li>
              <li>{ritual.degree}</li>
              <li>{ritual.country}</li>
              <li>{ritual.url}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}