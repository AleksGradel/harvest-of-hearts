'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Item } from '@/lib/sanity/types'

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
		<header className='w-full flex items-center justify-between p-4 bg-amber-50 shadow relative'>
			<Link href='/'>
				<h1 className='text-xl font-semibold text-amber-900'>
					Harvest of Hearts
				</h1>
			</Link>
			<div
				className='flex items-center gap-3'
				ref={containerRef}
			>
				<Link
					href='/gifts/categories'
					className='flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100 text-amber-900 hover:bg-amber-200 transition'
				>
					<Layers className='w-4 h-4' />
					Categories
				</Link>
				<button
					onClick={() => {
						setShowSearch((prev) => !prev)
						setQuery('')
						setResults([])
					}}
					className='p-2 rounded-full hover:bg-amber-100 transition'
				>
					<Search className='w-5 h-5 text-amber-900' />
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
								placeholder='Search items...'
								value={query}
								onChange={(e) => {
									setQuery(e.target.value)
									setHighlightedIndex(-1)
								}}
								onKeyDown={handleKeyDown}
								className='w-full px-3 py-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm'
							/>
							{isOpen && results.length > 0 && (
								<ul className='absolute z-50 bg-white border mt-1 w-full max-h-80 overflow-y-auto shadow-md rounded'>
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
								<p className='absolute mt-1 text-gray-500 text-sm'>
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
