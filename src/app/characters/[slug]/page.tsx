import GiftSection from '@/components/giftSection'
import { sanityClient } from '@/lib/sanity/sanity'
import groq from 'groq'

const characterQuery = `
  *[_type == "character" && slug.current == $slug][0]{
    _id,
    name,
    description,
	birthday,
	location,
    image {
      asset->{
        url
      }
    },
	loves[]->{
		_id,
		name,
		slug,
		imageUrl
	},
	likes[]->{
		_id,
		name,
		slug,
		imageUrl
	},
	dislikes[]->{
		_id,
		name,
		slug,
		imageUrl
	},
	hates[]->{
		_id,
		name,
		slug,
		imageUrl
	}
  }
`

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
	const { slug } = await params

	const character = await sanityClient.fetch(
		groq`*[_type == "character" && slug.current == $slug][0]{
      name
    }`,
		{ slug }
	)

	return {
		title: character
			? `${character.name} - Harvest of Hearts`
			: 'Character - Harvest of Hearts',
	}
}

export default async function CharacterPage({ params }: Props) {
	const { slug } = await params
	const character = await sanityClient.fetch(characterQuery, { slug })

	if (!character) {
		return <div className='p-8'>Character not found</div>
	}

	return (
		<div className='rounded-2xl shadow-lg p-4 bg-white'>
			<div className='flex flex-col justify-center items-center'>
				{character.image?.asset?.url && (
					<div>
						<img
							src={character.image.asset.url}
							alt={character.name}
							className='w-32 h-auto mb-2'
						/>
					</div>
				)}
				<h1 className='text-3xl font-bold mb-2'>{character.name}</h1>
				<div className='flex flex-row gap-2'>
					<p className='text-gray-600 text-sm'>🎂 {character.birthday}</p>
					<p className='text-gray-600 text-sm'>🏠 {character.location}</p>
				</div>
				<p className='mt-2 text-gray-700 italic text-sm text-center'>
					{character.description}
				</p>
			</div>
			<div className='inline-flex items-center justify-center w-full'>
				<hr className='w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700' />
				<span className='absolute px-3 text-lg font-bold text-gray-900 -translate-x-1/2 bg-white left-1/2'>
					Gift Guide 🎁
				</span>
			</div>
			<div>
				<GiftSection
					title='Loved Gifts'
					emoji='❤️'
					gifts={character.loves}
				/>
				<GiftSection
					title='Liked Gifts'
					emoji='👍'
					gifts={character.likes}
				/>
				<GiftSection
					title='Disliked Gifts'
					emoji='👎'
					gifts={character.dislikes}
				/>
				<GiftSection
					title='Hated Gifts'
					emoji='💀'
					gifts={character.hates}
				/>
			</div>
		</div>
	)
}
