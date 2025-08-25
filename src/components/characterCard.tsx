import { Character } from '@/lib/sanity/types'
import Image from 'next/image'
import Link from 'next/link'

interface CharacterCardProps {
	character: Character
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
	return (
		<Link href={`/characters/${character.slug}`}>
			<div className='mt-6 rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition'>
				{character.image?.asset?.url && (
					<div className='w-full h-48 relative mb-2 -mt-16'>
						<Image
							src={character.image.asset.url}
							alt={character.name}
							fill
							className='object-contain'
						/>
					</div>
				)}

				<h2 className='text-lg font-semibold text-center'>{character.name}</h2>
			</div>
		</Link>
	)
}
