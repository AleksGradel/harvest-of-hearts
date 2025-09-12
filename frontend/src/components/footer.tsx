import { Github } from 'lucide-react'

export const Footer = () => {
	return (
		<div
			className='w-full flex flex-col justify-center items-center h-auto bottom-0 bg-[#88A47C] 
			shadow text-white text-xs'
		>
			<p className='mt-2'>
				✨ This project was lovingly crafted as a tribute to{' '}
				<span className='font-semibold'>Stardew Valley</span> 🌾💖
			</p>
			<a
				className='my-2'
				href='https://github.com/AleksGradel'
				target='blank'
			>
				<Github size={16} />
			</a>
		</div>
	)
}
