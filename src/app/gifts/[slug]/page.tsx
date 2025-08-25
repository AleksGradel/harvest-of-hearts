import CharacterSection from '@/components/characterSection'
import { itemQuery } from '@/lib/sanity/queries'
import { sanityClient } from '@/lib/sanity/sanity'
import Image from 'next/image'

interface Props {
	params: { slug: string }
}

export default async function GiftPage({ params }: Props) {
	const { slug } = await params
	const item = await sanityClient.fetch(itemQuery, { slug })

	if (!item) {
		return <div className='p-8'>Item not found</div>
	}

	return (
		<div className='rounded-2xl shadow-md p-4 bg-white hover:shadow-lg transition'>
			<div className='flex flex-col justify-center items-center'>
				<h1 className='text-3xl font-bold'>{item.name}</h1>
				{item.imageUrl && (
					<div>
						<Image
							src={item.imageUrl}
							alt={item.name}
							width={64}
							height={64}
						/>
					</div>
				)}
				<p className='text-gray-600 text-sm'>{item.description}</p>
			</div>
			<div className='mt-4'>
				<CharacterSection title="Loved by" emoji="❤️" characters={item.lovedBy}  />
				<CharacterSection title="Liked by" emoji="👍" characters={item.likedBy}  />
				<CharacterSection title="Disliked by" emoji="👎" characters={item.dislikedBy}  />
				<CharacterSection title="Hated by" emoji="💀" characters={item.hatedBy}  />
			</div>
		</div>
	)
}
