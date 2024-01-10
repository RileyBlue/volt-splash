// Image.js
import React from 'react';
import './Card.css';

function Image({ src, author, width, height, grayscale, blurEffect }) {
    // Extract the image ID from the URL
    const handleClick = () => {
        console.log('Blur effect value:', blurEffect); 
        const imageIdMatch = src.match(/\/id\/(\d+)\//);
        const imageId = imageIdMatch ? imageIdMatch[1] : null;

        if (imageId) {
            let params = new URLSearchParams();

            if (grayscale) params.append('grayscale', '');
            if (blurEffect > 0) params.append('blur', blurEffect);

            let baseUrl = `https://picsum.photos/id/${imageId}/${width}/${height}`;
            let paramString = params.toString();
            if (paramString) {
                baseUrl += `?${paramString}`;
            }

            console.log('Opening image URL:', baseUrl); // Print URL 
            window.open(baseUrl, '_blank');
        }
    };
    return (
        <div className="Image" onClick={handleClick}>
            <img src={src} alt={`Placeholder by ${author}`} />
            <p>By {author}</p>
        </div>
    );
}

export default Image;
