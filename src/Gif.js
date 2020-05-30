import React, { useState } from 'react'

const Gif = ({ images }) => {
	const [loaded, setLoaded] = useState(false)

	return (
		<video
			className={`grid-item video ${loaded && 'loaded'}`}
			autoPlay
			loop
			src={images.original.mp4}
			onLoadedData={() => setLoaded(true)}
		/>
	)
}

export default Gif
