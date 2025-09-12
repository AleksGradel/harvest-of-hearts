import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import { Footer } from '@/components/footer'

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
				<div className='bg-[#fff9f0] text-[#333]'>
					<Header  />
					<main className='min-h-screen p-4 max-w-4xl mx-auto'>{children}</main>
					<Footer  />
				</div>
			</body>
		</html>
	)
}
