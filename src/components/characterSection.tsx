import { CharacterReference } from "@/lib/sanity/types"
import Image from "next/image"
import Link from "next/link"

interface CharacterSectionProps {
  title: string
  emoji: string
  characters: CharacterReference[]
}

export default function CharacterSection({ title, emoji, characters }: CharacterSectionProps) {
  if (!characters || characters.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {emoji} {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {characters.map((character) => (
          <Link key={character._id} href={`/characters/${character.slug?.current}`}>
		  	<div
            className="flex flex-col items-center w-20 text-center"
          >
            {character.image?.asset?.url && (
              <Image
                src={character.image.asset.url}
                alt={character.name}
                width={48}
                height={48}
                className="rounded-md"
              />
            )}
            <span className="text-xs mt-1">{character.name}</span>
          </div>
		  </Link>
        ))}
      </div>
    </div>
  )
}