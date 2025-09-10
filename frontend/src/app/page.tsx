import { sanityClient } from "@/lib/sanity/sanity";
import { charactersQuery } from "@/lib/sanity/queries";
import { Character } from "@/lib/sanity/types";
import { CharacterCard } from "@/components/characterCard";

export default async function Home() {
  const characters: Character[] = await sanityClient.fetch(charactersQuery)
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {characters.map((char) => (
        <CharacterCard  key={char._id} character={char} />
      ))}
    </div>
  );
}
