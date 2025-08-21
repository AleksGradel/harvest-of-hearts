import { sanityClient } from '@/lib/sanity/sanity'

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
    }
  }
`

interface Props {
	params: { slug: string }
}

export default async function CharacterPage({ params }: Props) {
	const character = await sanityClient.fetch(characterQuery, {
		slug: params.slug,
	})

	if (!character) {
		return <div className='p-8'>Character not found</div>
	}

	return (
		<div className='rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition'>
			<div  className='flex'>
				{character.image?.asset?.url && (
					<div>
						<img
							src={character.image.asset.url}
							alt={character.name}
							className='w-64 h-auto mb-4'
						/>
					</div>
				)}
				<div className='flex flex-col justify-center items-center'>
					<h1 className='text-3xl font-bold mb-2'>{character.name}</h1>
					<p className='text-gray-600 text-sm'>🎂 {character.birthday}</p>
					<p className='text-gray-600 text-sm'>🏠 {character.location}</p>
					<p className='mt-2 text-gray-700 italic text-sm text-center'>
						{character.description}
					</p>
				</div>
			</div>
		</div>
	)
}
