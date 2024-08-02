import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { config } from './config';
import WalletProvider, { Wallet } from './components/Wallet';
import CreateNFT from './components/CreateNFT';
import CreateSafe from './components/CreateSafe';
import { uploadToIPFS } from './ipfsClient';

const queryClient = new QueryClient();

const App: React.FC = () => {
    const [cid, setCid] = useState<string | null>(null);
    const [gnosisSafes, setGnosisSafes] = useState<string[]>([]);
    const [selectedSafe, setSelectedSafe] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const cid = await uploadToIPFS(file);
            setCid(cid);
            console.log('File uploaded to IPFS with CID:', cid);
        }
    };

    const handleCreateSafe = (safeAddress: string) => {
        setGnosisSafes([...gnosisSafes, safeAddress]);
        setSelectedSafe(safeAddress);
    };

    return (
        <WagmiConfig config={config}>
            <QueryClientProvider client={queryClient}>
                <WalletProvider>
                    <div className="container">
                        <h1>Decentralized NFT Marketplace</h1>
                        <Wallet />
                        <input type="file" onChange={handleUpload} className="file-input" />
                        {cid && (
                            <div>
                                <p>File CID: {cid}</p>
                                <p>IPFS URL: <a href={`https://gateway.pinata.cloud/ipfs/${cid}`} target="_blank" rel="noopener noreferrer">{`https://gateway.pinata.cloud/ipfs/${cid}`}</a></p>
                                {selectedSafe ? (
                                    <CreateNFT cid={cid} safeAddress={selectedSafe} />
                                ) : (
                                    <p>Please select a Gnosis Safe address to create NFT</p>
                                )}
                            </div>
                        )}
                        <CreateSafe onCreateSafe={handleCreateSafe} />
                        {gnosisSafes.length > 0 && (
                            <div>
                                <h2>Connected Gnosis Safes</h2>
                                <ul>
                                    {gnosisSafes.map((safe, index) => (
                                        <li key={index}>
                                            <button onClick={() => setSelectedSafe(safe)}>
                                                {safe}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {selectedSafe && (
                                    <div>
                                        <p>Selected Safe: {selectedSafe}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </WalletProvider>
            </QueryClientProvider>
        </WagmiConfig>
    );
};

export default App;
