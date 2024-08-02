import Safe, { SafeFactory, SafeAccountConfig, SafeDeploymentConfig } from '@gnosis.pm/safe-core-sdk';
import EthersAdapter from '@gnosis.pm/safe-ethers-lib';
import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();

const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
});

async function createSafe() {
    const safeFactory = await SafeFactory.create({ ethAdapter });
    const safeAccountConfig: SafeAccountConfig = {
        owners: [await signer.getAddress()],
        threshold: 1,
    };
    const safeDeploymentConfig: SafeDeploymentConfig = {
        saltNonce: ethers.utils.hexlify(ethers.utils.randomBytes(32)), // 将 Uint8Array 转换为 hex string
    };
    const safeSdk = await safeFactory.deploySafe({
        safeAccountConfig,
        safeDeploymentConfig,
    });
    return safeSdk;
}

export { createSafe };
