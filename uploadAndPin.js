const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fsExtra = require('fs-extra');

const PINATA_API_KEY = 'd9f24bcb5a6ec5efc3d7';
const PINATA_API_SECRET = 'fb30a80408eda20c53579d63cb6050cf208f3c480e2e90838fb50858c7c7fa93';

const distPath = path.join(__dirname, 'dist');

const uploadDirectoryToPinata = async (dirPath) => {
    const data = new FormData();

    const walkSync = (currentDirPath, callback) => {
        fs.readdirSync(currentDirPath).forEach(name => {
            const filePath = path.join(currentDirPath, name);
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
                const fileStream = fs.createReadStream(filePath);
                data.append('file', fileStream, {
                    filepath: path.relative(distPath, filePath)
                });
            } else if (stat.isDirectory()) {
                walkSync(filePath, callback);
            }
        });
    };

    walkSync(dirPath);

    const metadata = JSON.stringify({
        name: 'nft marketplace',
        keyvalues: {
            index: 'index.html'
        }
    });
    data.append('pinataMetadata', metadata);

    const options = JSON.stringify({
        cidVersion: 0,
    });
    data.append('pinataOptions', options);

    try {
        const res = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', data, {
            maxBodyLength: 'Infinity',
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                'pinata_api_key': PINATA_API_KEY,
                'pinata_secret_api_key': PINATA_API_SECRET,
            },
        });
        console.log('Directory uploaded to Pinata: ', res.data);
    } catch (error) {
        console.error('Error uploading directory to Pinata: ', error.response ? error.response.data : error.message);
    }
};

const main = async () => {
    try {
        await uploadDirectoryToPinata(distPath);
    } catch (error) {
        console.error('Error: ', error);
    }
};

main();
