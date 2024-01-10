// utils.js
export const generateImageUrl = (width, height, grayscale, blur) => {
    let baseUrl = `https://picsum.photos/${width}/${height}`;
    let queryParameters = [];

    if (grayscale) queryParameters.push('grayscale');
    if (blur) queryParameters.push('blur');

    return `${baseUrl}?${queryParameters.join('&')}`;
};
