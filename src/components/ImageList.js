// ImageList.js
import React from 'react';
import Image from './Card';
import './ImageList.css';

function ImageList({ images, width, height, grayscale, blurEffect }) {
    return (
        images.map((image, index) => (
            <Image 
                key={index} 
                src={image.src} 
                author={image.author}
                width={width}
                height={height}
                grayscale={grayscale}
                blurEffect={blurEffect}
            />
        ))
    );
}

export default ImageList;
