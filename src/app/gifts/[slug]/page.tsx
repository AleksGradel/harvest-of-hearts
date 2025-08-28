import CharacterSection from '@/components/characterSection'
import { itemQuery } from '@/lib/sanity/queries'
import { sanityClient } from '@/lib/sanity/sanity'
import { Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
				<h1 className='text-3xl'>{item.name}</h1>
				{item.imageUrl && (
					<div className='my-2'>
						<Image
							src={item.imageUrl}
							alt={item.name}
							width={64}
							height={64}
						/>
					</div>
				)}
				<p className='text-gray-600 text-sm italic'>{item.description}</p>
				<Link href={`category/${item.category}`}>
					<span className='flex bg-[#d98fa3] rounded-2xl p-2 mt-2 text-white text-xs capitalize'>
						<Tag
							size={16}
							className='mr-1'
						/>
						{item.category}
					</span>
				</Link>
			</div>
			<div className='mt-4'>
				<CharacterSection
					title='Loved by'
					emoji='❤️'
					characters={item.lovedBy}
				/>
				<CharacterSection
					title='Liked by'
					emoji='👍'
					characters={item.likedBy}
				/>
				<CharacterSection
					title='Disliked by'
					emoji='👎'
					characters={item.dislikedBy}
				/>
				<CharacterSection
					title='Hated by'
					emoji='💀'
					characters={item.hatedBy}
				/>
			</div>
		</div>
	)
}
