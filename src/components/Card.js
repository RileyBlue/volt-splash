// Image.js
import React from 'react';
import './Card.css';

function Image({ src, author, width, height, grayscale, blurEffect }) {
    // Extrae el ID de la imagen de la URL
    const handleClick = () => {
        // Extrae el ID de la imagen de la URL
        const imageIdMatch = src.match(/\/id\/(\d+)\//);
        const imageId = imageIdMatch ? imageIdMatch[1] : null;
    
        if (imageId) {
            let imageUrl = `https://picsum.photos/id/${imageId}/${width}/${height}`;
            const params = [];
            if (grayscale) params.push('grayscale');
            if (blurEffect > 0) params.push(`blur=${blurEffect}`);
            if (params.length > 0) {
                imageUrl += '?' + params.join('&');
            }

            //window.location.href = imageUrl;
            window.open(imageUrl, '_blank');
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
