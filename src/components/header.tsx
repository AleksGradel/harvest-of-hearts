'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Item } from '@/lib/sanity/types'
import { Span } from 'next/dist/trace'

export default function Header() {
	const [showSearch, setShowSearch] = useState(false)
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<Item[]>([])
	const [loading, setLoading] = useState(false)
	const [highlightedIndex, setHighlightedIndex] = useState(-1)
	const [isOpen, setIsOpen] = useState(false)

	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!query) {
			setResults([])
			setIsOpen(false)
			return
		}

		setLoading(true)
		const delayDebounce = setTimeout(() => {
			fetch(`/api/searchItems?q=${encodeURIComponent(query)}`)
				.then((res) => res.json())
				.then((data) => {
					setResults(data)
					setLoading(false)
					setIsOpen(true)
				})
		}, 300)

		return () => clearTimeout(delayDebounce)
	}, [query])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!isOpen || results.length === 0) return

		if (e.key === 'ArrowDown') {
			e.preventDefault()
			setHighlightedIndex((prev) => Math.min(prev + 1, results.length - 1))
		} else if (e.key === 'ArrowUp') {
			e.preventDefault()
			setHighlightedIndex((prev) => Math.max(prev - 1, 0))
		} else if (e.key === 'Enter') {
			if (highlightedIndex >= 0) {
				const item = results[highlightedIndex]
				window.location.href = `/gifts/${item.slug.current}`
			}
		} else if (e.key === 'Escape') {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (!containerRef.current?.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<header
			className='w-full flex items-center justify-between p-4 bg-amber-50 shadow relative'
			style={{ backgroundColor: '#d98fa3' }}
		>
			<Link href='/' className='flex'>
				<h1 className='text-xl font-semibold text-white mr-2 hidden md:block'>
					Harvest of Hearts
				</h1>
				<h1 className='text-xl'>🌾💖</h1>
			</Link>
			<div
				className='flex items-center gap-1 md:gap-3'
				ref={containerRef}
			>
				<Link
					href='/gifts/categories'
					className='flex items-center gap-1 px-3 py-1 rounded-lg text-white border-none md:border 
					hover:text-[#d98fa3] hover:bg-white transition'
				>
					<Layers className='w-5 h-5 md:w-4 md:h-4' />
					<span className='hidden md:block'>Categories</span>
				</Link>
				<button
					onClick={() => {
						setShowSearch((prev) => !prev)
						setQuery('')
						setResults([])
					}}
					className='p-2 rounded-full hover:bg-white transition'
				>
					<Search className='w-5 h-5 text-white hover:text-[#d98fa3]' />
				</button>
				<AnimatePresence>
					{showSearch && (
						<motion.div
							key='search-container'
							initial={{ width: 0, opacity: 0 }}
							animate={{ width: 220, opacity: 1 }}
							exit={{ width: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className='relative'
						>
							<input
								type='text'
								placeholder='Search gifts...'
								value={query}
								onChange={(e) => {
									setQuery(e.target.value)
									setHighlightedIndex(-1)
								}}
								onKeyDown={handleKeyDown}
								className='w-full px-3 py-1 border border-white rounded-lg shadow-sm 
								focus:outline-none focus:ring-1 focus:ring-slate-200 text-sm text-white'
							/>
							{isOpen && results.length > 0 && (
								<ul className='absolute z-50 bg-white mt-1 w-full max-h-80 overflow-y-auto shadow-md rounded'>
									{results.map((item, index) => (
										<li
											key={item._id}
											className={`p-2 flex items-center gap-2 cursor-pointer ${
												index === highlightedIndex ? 'bg-gray-200' : ''
											}`}
											onMouseEnter={() => setHighlightedIndex(index)}
											onClick={() =>
												(window.location.href = `/gifts/${item.slug.current}`)
											}
										>
											{item.imageUrl && (
												<Image
													src={item.imageUrl}
													alt={item.name}
													width={28}
													height={28}
													className='rounded'
												/>
											)}
											<span>{item.name}</span>
										</li>
									))}
								</ul>
							)}

							{loading && (
								<p className='absolute w-full p-2 mt-1 text-gray-500 text-sm bg-white shadow-md rounded'>
									Loading...
								</p>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}
