import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import HeaderSearch from '@/components/headerSearch'

export const metadata: Metadata = {
	title: 'Harvest of Hearts',
	description: 'A gift guide for every heart in the Valley.',
	icons: {
		icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌾❤️</text></svg>',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<div className='min-h-screen bg-[#fff9f0] text-[#333]'>
					<header className='sticky top-0 z-50 bg-[#d98fa3] text-white shadow-md'>
						<div className='max-w-6xl mx-auto flex items-center justify-between px-6 py-3'>
							<div className='text-center'>
								<Link
									href='/'
									className='text-2xl'
								>
									Harvest of Hearts 🌾💝
								</Link>
								<p className='text-xs mt-1 italic'>
									Know what they love. Harvest those hearts.
								</p>
							</div>
							<div className='w-64'>
								<HeaderSearch />
							</div>
						</div>
					</header>
					<main className='p-4 max-w-4xl mx-auto'>{children}</main>
				</div>
			</body>
		</html>
	)
}
