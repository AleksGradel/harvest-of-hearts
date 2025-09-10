import { ItemReference } from "@/lib/sanity/types"
import Image from "next/image"
import Link from "next/link"

interface GiftSectionProps {
  title: string
  emoji: string
  gifts: ItemReference[]
}

export default function GiftSection({ title, emoji, gifts }: GiftSectionProps) {
  if (!gifts || gifts.length === 0) return null

  return (
    <div className="mb-6">
      <h1 className="font-semibold mb-2">
        {emoji} {title}
      </h1>
      <div className="flex flex-wrap gap-4">
        {gifts.map((gift) => (
          <Link key={gift._id} href={`/gifts/${gift.slug?.current}`}>
		  	<div
            className="flex flex-col items-center w-20 text-center"
          >
            {gift.imageUrl && (
              <Image
                src={gift.imageUrl}
                alt={gift.name}
                width={48}
                height={48}
                className="rounded-md"
              />
            )}
            <span className="text-xs mt-1">{gift.name}</span>
          </div>
		  </Link>
        ))}
      </div>
    </div>
  )
}