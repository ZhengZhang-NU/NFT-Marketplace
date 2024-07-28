import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { config } from './config';
import WalletProvider, { Wallet } from './components/Wallet';
import CreateNFT from './components/CreateNFT';
import { uploadToIPFS } from './ipfsClient';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [cid, setCid] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const cid = await uploadToIPFS(file);
            setCid(cid);
            console.log('File uploaded to IPFS with CID:', cid);
        }
    };

    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletProvider>
                    <div className="container">
                        <h1>Decentralized NFT Marketplace</h1>
                        <Wallet />
                        <input type="file" onChange={handleUpload} className="file-input"/>
                        {cid && (
                            <div>
                                <p>File CID: {cid}</p>
                                <p>IPFS URL: <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">{`https://gateway.pinata.cloud/ipfs/${cid}`}</a></p>
                                <CreateNFT cid={cid} />
                            </div>
                        )}
                    </div>
                </WalletProvider>
            </QueryClientProvider>
        </WagmiConfig>
    );
};

export default App;
