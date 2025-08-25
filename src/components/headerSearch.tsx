'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Item } from '@/lib/sanity/types'

export default function HeaderSearch() {
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
			setHighlightedIndex((prev) => Math.max(prev - 0, 0))
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
		<div
			ref={containerRef}
			className='relative w-full max-w-md'
		>
			<input
				type='text'
				value={query}
				onChange={(e) => {
					setQuery(e.target.value)
					setHighlightedIndex(-1)
				}}
				onKeyDown={handleKeyDown}
				placeholder='Search items...'
				className='p-2 border rounded w-full'
			/>

			{loading && <p className='absolute mt-1 text-gray-500'>Loading...</p>}

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
									width={32}
									height={32}
								/>
							)}
							<span>{item.name}</span>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
