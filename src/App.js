import React, { useState } from 'react'
import loader from './images/loader.svg'

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

	const handleChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		setHintText(value.length > 2 ? `Hit enter to search ${value}` : '')
	}

	const handleKeyPress = (event) => {
		const { value } = event.target
		if (value.length > 2 && event.key === 'Enter') {
			alert(`search for ${value}`)
		}
		console.log(event.key)
	}

	return (
		<div className="page">
			<Header />
			<div className="search grid">
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
