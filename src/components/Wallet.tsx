import React from 'react';
import { WagmiConfig, useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { config } from '../config';

interface WalletProviderProps {
    children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => (
    <WagmiConfig config={config}>{children}</WagmiConfig>
);

export const Wallet: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { connect } = useConnect({
        connector: new InjectedConnector({
            options: {
                shimDisconnect: true,
            },
        }),
    });
    const { disconnect } = useDisconnect();

    return (
        <div>
            {isConnected ? (
                <div>
                    <p>Connected as: {address}</p>
                    <button onClick={() => disconnect()}>Disconnect</button>
                </div>
            ) : (
                <button onClick={() => connect()}>Connect Wallet</button>
            )}
        </div>
    );
};

export default WalletProvider;
