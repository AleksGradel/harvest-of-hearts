import Image from "next/image"

interface Gift {
  _id: string
  name: string
  imageUrl?: string
}

interface GiftSectionProps {
  title: string
  emoji: string
  gifts: Gift[]
}

export default function GiftSection({ title, emoji, gifts }: GiftSectionProps) {
  if (!gifts || gifts.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">
        {emoji} {title}
      </h3>
      <div className="flex flex-wrap gap-4">
        {gifts.map((gift) => (
          <div
            key={gift._id}
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
        ))}
      </div>
    </div>
  )
}