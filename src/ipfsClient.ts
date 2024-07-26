import { create } from 'ipfs-http-client';

const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const uploadToIPFS = async (file: File) => {
    const added = await client.add(file);
    return added.cid.toString();
};

export default client;
