import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { NFTCollectionAddress } from '../config';
import contractJson from '../../out/NFTCollectionWithSignature.sol/NFTCollectionWithSignature.json';

interface CreateNFTProps {
    cid: string;
}

const CreateNFT: React.FC<CreateNFTProps> = ({ cid }) => {
    const { address } = useAccount();
    const [message, setMessage] = useState<string>("");
    const [signature, setSignature] = useState<string>("");

    const signMessage = async () => {
        if (!message || !address) return;
        const signer = new ethers.providers.Web3Provider(window.ethereum!).getSigner();
        const sig = await signer.signMessage(message);
        setSignature(sig);
    };

    const { config, error: prepareError } = usePrepareContractWrite({
        address: NFTCollectionAddress,
        abi: contractJson.abi,
        functionName: 'mintTo',
        args: [address, signature, message],
        chainId: 11155111, // Sepolia testnet chain ID
    });

    const { writeAsync, error: writeError } = useContractWrite(config);

    const handleCreateNFT = async () => {
        if (!writeAsync) {
            alert('Contract write not prepared');
            return;
        }

        try {
            await writeAsync();
            alert('NFT created successfully!');
        } catch (error) {
            console.error('Error creating NFT:', error);
            alert('Error creating NFT');
        }
    };

    return (
        <div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter message for NFT" />
            <button onClick={signMessage}>Sign Message</button>
            <button onClick={handleCreateNFT} disabled={!signature}>Create NFT with Signature</button>
            {prepareError && <p>Error preparing contract write: {prepareError.message}</p>}
            {writeError && <p>Error writing contract: {writeError.message}</p>}
        </div>
    );
};

export default CreateNFT;
