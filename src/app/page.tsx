import { sanityClient } from "@/lib/sanity/sanity";
import { charactersQuery } from "@/lib/sanity/queries";
import { Character } from "@/lib/sanity/types";

export default async function Home() {
  const characters: Character[] = await sanityClient.fetch(charactersQuery)
  return (
    <div className="p-8">
      {characters.map((char) => (
        <div key={char._id}>
          <h2>{char.name}</h2>
        </div>
      ))}
    </div>
  );
}
