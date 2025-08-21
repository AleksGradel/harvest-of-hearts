import Image from 'next/image'
import Link from 'next/link'

export interface Character {
	_id: string
	name: string
	description?: string
	slug?: string
	image?: {
		asset?: {
			url: string
		}
	}
}

interface CharacterCardProps {
	character: Character
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
	return (
		<Link href={`/characters/${character.slug}`}>
			<div className='rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition'>
				{character.image?.asset?.url && (
					<div className='w-full h-48 relative mb-4 -mt-16'>
						<Image
							src={character.image.asset.url}
							alt={character.name}
							fill
							className='object-contain'
						/>
					</div>
				)}

				<h2 className='text-lg font-semibold'>{character.name}</h2>
			</div>
		</Link>
	)
}
