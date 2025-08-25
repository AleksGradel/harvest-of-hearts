import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import HeaderSearch from '@/components/headerSearch'

export const metadata: Metadata = {
	title: 'Harvest of Hearts',
	description: 'A gift guide for every heart in the Valley.',
  icons: {
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌾❤️</text></svg>',
      }
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html>
			<body>
				<div className='min-h-screen bg-[#fff9f0] text-[#333] font-pixel'>
					<header className='p-4 text-center bg-[#d98fa3] text-white shadow-md'>
						<Link href='/'>
							<h1 className='text-3xl tracking-wide'>Harvest of Hearts</h1>
						</Link>
						<p className='text-sm mt-1 italic'>
							Know what they love. Harvest those hearts.
						</p>
					</header>
					<div className='my-2 flex justify-center'>
						<HeaderSearch  />
					</div>
					<main className='p-4 max-w-4xl mx-auto'>{children}</main>
				</div>
			</body>
		</html>
	)
}
