import React, { useState, useRef } from 'react'

import loader from './images/loader.svg'
import clearButton from './images/close-icon.svg'

import Gif from './Gif'

const randomChoice = (arr) => {
	const randIndex = Math.floor(Math.random() * arr.length)
	return arr[randIndex]
}

const Header = ({ clearSearch, hasResults }) => (
	<div className="header grid">
		{hasResults ? (
			<button onClick={clearSearch}>
				<img src={clearButton} alt="clear search" />
			</button>
		) : (
			<h1 className="title">Jiffy</h1>
		)}
	</div>
)

const UserHint = ({ loading, hintText }) => (
	<div className="user-hint">
		{loading ? (
			<img className="block mx-auto" src={loader} alt="loading..." />
		) : (
			hintText
		)}
	</div>
)

function App() {
	const [searchTerm, setSearchTerm] = useState('')
	const [hintText, setHintText] = useState('')
	const [gifs, setGifs] = useState([])
	const [loading, setLoading] = useState(false)

	const searchGiphy = async (searchTerm) => {
		setLoading(true)

		try {
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=jps2bL6BidxBdFP1O8LoV4KyafdTHV5n&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
			)
			const { data } = await response.json() // data.data

			if (!data.length) {
				throw new Error(`Nothing found for ${searchTerm}`)
			}

			// console.log(data[0].images.original.mp4)
			const randomGif = randomChoice(data)

			setGifs([...gifs, randomGif])

			setLoading(false)
			setHintText(`Hit enter to see more ${searchTerm}`)
		} catch (error) {
			setLoading(false)
			setHintText(error.message)
		}
	}

	const handleChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		setHintText(value.length > 2 ? `Hit enter to search ${value}` : '')
	}

	const handleKeyPress = (event) => {
		const { value } = event.target
		if (value.length > 2 && event.key === 'Enter') {
			searchGiphy(value)
		}
	}

	const clearSearch = () => {
		setSearchTerm('')
		setHintText('')
		setGifs([])
		textInput.current.focus()
	}

	const hasResults = gifs.length
	const textInput = useRef()

	return (
		<div className="page">
			<Header clearSearch={clearSearch} hasResults={hasResults} />

			<div className="search grid">
				{gifs.map((gif, index) => (
					<Gif key={index} {...gif} />
				))}

				<input
					type="text"
					className="input grid-item"
					placeholder="Type something"
					onChange={(event) => handleChange(event)}
					onKeyPress={(event) => handleKeyPress(event)}
					value={searchTerm}
					ref={textInput}
				/>
			</div>

			<UserHint hintText={hintText} loading={loading} />
		</div>
	)
}

export default App
