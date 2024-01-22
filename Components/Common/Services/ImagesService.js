import RNFS from 'react-native-fs';

// Convert bytes to image function
const convertBytesToImage = async ({ bytes }, name) => {
    // Define the image source String
    const imageSource = ''
    try {
        // Convert bytes to base64 string
        const base64String = bytes.toString('base64')

        // Write the base64 string to a temporary file using the name
        const imagePath = `${RNFS.DocumentDirectoryPath}/${name}.png`
        await RNFS.writeFile(imagePath, base64String, 'base64')

        // Set the image source for display
        imageSource = `file://${imagePath}`

        // Return the String   
        return imageSource 
    } catch (error) {
        console.error('Error converting bytes to image:', error);
    }
};

// Export the functions one by one
export {
    convertBytesToImage
};
