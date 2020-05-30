import React from 'react'

const Gif = ({ images }) => (
	<video className="grid-item video" autoPlay loop src={images.original.mp4} />
)

export default Gif
