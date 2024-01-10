import React, { useState, useEffect } from 'react';
import ImageList from './components/ImageList';
import Controls from './components/Controls';
import SkeletonCard from './components/SkeletonCard';
import './App.css';

function App() {
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [grayscale, setGrayscale] = useState(false);
  const [blurEffect, setBlurEffect] = useState(0); 
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageCount, setImageCount] = useState(5);

  const fetchImageDetails = async (id, width, height, grayscale, blur) => {
    // Construct the URL with the appropriate parameters
    let url = `https://picsum.photos/id/${id}/${width}/${height}?`;
    if (grayscale) url += 'grayscale&';
    if (blurEffect) url += 'blur&';

    // Retrieve the image information
    const response = await fetch(url);
    const imageDetails = await response.json();
    return imageDetails;
  };

  useEffect(() => {
    updateImages({ width, height, grayscale, blurEffect, count: imageCount });
  }, [width, height, grayscale, blurEffect, imageCount]); // Update the images when these values change


  const updateImages = async(params) => {
    setIsLoading(true);
    // Generate a unique value for each image
    const uniqueValues = Array.from({ length: params.count }, () => 
      Math.random().toString(36).substr(2, 5)
    );
  
    const imagePromises = uniqueValues.map(uniqueValue => {
      let url = `https://picsum.photos/seed/${uniqueValue}/${params.width}/${params.height}`;
      if (params.grayscale) url += '?grayscale';
      if (params.blurEffect > 0) url += url.includes('?') ? `&blur=${params.blurEffect}` : `?blur=${params.blurEffect}`;

      return fetch(url);
    }); 
  
    // Process the responses
    Promise.all(imagePromises)
      .then(responses => Promise.all(responses.map(res => {
        const picsumId = res.headers.get('Picsum-ID');
        return fetch(`https://picsum.photos/id/${picsumId}/info`)
          .then(infoRes => infoRes.json())
          .then(info => ({
            src: res.url,
            author: info.author
          }));
      })))
      .then(imagesWithAuthors => {
        setImages(imagesWithAuthors);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
        setIsLoading(false);
      });
  };
  return (
    <div className="App">
      <Controls 
        onUpdate={updateImages} 
        imageCount={imageCount}
        setImageCount={setImageCount}
        width={width}
        height={height}
        setWidth={setWidth}
        setHeight={setHeight}
        grayscale={grayscale}
        setGrayscale={setGrayscale}
        blurEffect={blurEffect} 
        setBlurEffect={setBlurEffect}
      />
      <div className="ImageList">
        {isLoading ? (
          Array.from({ length: imageCount }, (_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          <ImageList 
            images={images} 
            width={width}
            height={height}
            setWidth={setWidth}
            setHeight={setHeight}
            grayscale={grayscale}
            blurEffect={blurEffect}
          />
        )}
      </div>
    </div>
  );
}

export default App;
