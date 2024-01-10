import React, { useState } from 'react';
import './Controls.css';

function Controls({ onUpdate, imageCount, setImageCount, width, setWidth, height, setHeight, grayscale, setGrayscale, blurEffect, setBlurEffect }) {
    const handleWidthChange = (event) => {
        setWidth(Number(event.target.value));
    };

    const handleHeightChange = (event) => {
        setHeight(Number(event.target.value));
    };

    const handleGrayscaleChange = (event) => {
        setGrayscale(event.target.checked);
    };

    const handleBlurChange = (event) => {
        setBlurEffect(Number(event.target.value));
    };

    const handleImageCountChange = (event) => {
        setImageCount(Number(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdate({ width, height, grayscale, blur: blurEffect, count: imageCount });
    };

    return (
        <div className="controls-container">
            <form onSubmit={handleSubmit}>
                <div className="size-controls">
                    <div className="form-group">
                        <label htmlFor="width">Width</label>
                        <input id="width" type="number" value={width} onChange={handleWidthChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="height">Height</label>
                        <input id="height" type="number" value={height} onChange={handleHeightChange} />
                    </div>
                </div>
            

                <div className="filter-controls">
                    <div className="form-group grayscale">
                        <label htmlFor="grayscale">Grayscale</label>
                        <input id="grayscale" type="checkbox" checked={grayscale} onChange={handleGrayscaleChange} />
                    </div>
                    <div className="form-group blur">
                        <label htmlFor="blur">Blur: {blurEffect}</label>
                        <input id="blur" type="range" min="0" max="5" value={blurEffect} onChange={handleBlurChange} />
                    </div>
                </div>

                <div className="form-group imageCount">
                    <label htmlFor="imageCount">Number of Images: {imageCount}</label>
                    <input
                        id="imageCount"
                        type="range"
                        min="1"
                        max="20"
                        value={imageCount}
                        onChange={handleImageCountChange}
                    />
                </div>

                <button className='button' type="submit">Generate Images</button>
            </form>
        </div>
    );
}

export default Controls;
