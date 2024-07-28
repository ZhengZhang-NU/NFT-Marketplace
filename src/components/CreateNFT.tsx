import React from 'react';
import { useAccount } from 'wagmi';
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { NFTCollectionAddress } from '../config';
import contractJson from '../../out/NFTCollection.sol/NFTCollection.json';

interface CreateNFTProps {
    cid: string;
}

const CreateNFT: React.FC<CreateNFTProps> = ({ cid }) => {
    const { address } = useAccount();

    const { config, error: prepareError } = usePrepareContractWrite({
        address: NFTCollectionAddress,
        abi: contractJson.abi,
        functionName: 'mintTo',
        args: [address],
        chainId: 11155111, // Sepolia testnet chain ID
    });

    const { writeAsync, error: writeError } = useContractWrite(config);

    const handleCreateNFT = async () => {
        if (!writeAsync) {
            alert('Contract write not prepared');
            return;
        }

        try {
            const txResponse = await writeAsync();

            alert('NFT created successfully!');
        } catch (error) {
            console.error('Error creating NFT:', error);
            alert('Error creating NFT');
        }
    };

    return (
        <div>
            <button onClick={handleCreateNFT}>Create NFT</button>
            {prepareError && <p>Error preparing contract write: {prepareError.message}</p>}
            {writeError && <p>Error writing contract: {writeError.message}</p>}
        </div>
    );
};

export default CreateNFT;
