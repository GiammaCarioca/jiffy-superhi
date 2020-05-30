import React, { useState } from 'react'

const Header = () => (
	<div className="header grid">
		<h1 className="title">Jiffy</h1>
	</div>
)

function App() {
	const [searchTerm, setSearchTerm] = useState('')

	const handleChange = (event) => {
		const { value } = event.target
		setSearchTerm(value)
		if (value.length > 2) {
		}
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
		</div>
	)
}

export default App
