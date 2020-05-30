import React, { useState } from 'react'
import { API_KEY } from './config'
import loader from './images/loader.svg'
import Gif from './Gif'

const randomChoice = (arr) => {
	const randIndex = Math.floor(Math.random() * arr.length)
	return arr[randIndex]
}

const Header = () => (
	<div className="header grid">
		<h1 className="title">Jiffy</h1>
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

	const searchGiphy = async (searchTerm) => {
		try {
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
			)
			const { data } = await response.json() // data.data

			// console.log(data[0].images.original.mp4)
			const randomGif = randomChoice(data)

			setGifs([...gifs, randomGif])
		} catch (error) {}
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

	return (
		<div className="page">
			<Header />
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
				/>
			</div>

			<UserHint hintText={hintText} />
		</div>
	)
}

export default App
