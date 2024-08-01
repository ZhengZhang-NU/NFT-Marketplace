import axios from 'axios';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Pinata API Key and Secret
const PINATA_API_KEY = 'd9f24bcb5a6ec5efc3d7';
const PINATA_API_SECRET = 'fb30a80408eda20c53579d63cb6050cf208f3c480e2e90838fb50858c7c7fa93';


const __dirname = path.dirname(new URL(import.meta.url).pathname);


const htmlFilePath = path.join(__dirname, 'dist', 'index.html');

const uploadHtmlToPinata = async (filePath) => {
    const data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_API_SECRET,
            },
        });
        return res.data;
    } catch (error) {
        console.error('Error uploading HTML file to Pinata:', error.response ? error.response.data : error.message);
        throw error;
    }
};

const main = async () => {
    try {
        console.log('Uploading HTML file to Pinata...');
        const result = await uploadHtmlToPinata(htmlFilePath);
        console.log('HTML file uploaded to Pinata: ', result);
    } catch (error) {
        console.error('Error:', error);
    }
};

main();
