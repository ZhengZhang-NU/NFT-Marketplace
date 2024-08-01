const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

const contractJson = JSON.parse(fs.readFileSync("./out/NFTCollectionWithSignature.sol/NFTCollectionWithSignature.json", "utf8"));

async function main() {
    try {
        const alchemyApiKey = process.env.VITE_ALCHEMY_API_KEY;
        const privateKey = process.env.VITE_PRIVATE_KEY;

        if (!alchemyApiKey) {
            throw new Error("Alchemy API key is not defined in .env file");
        }
        if (!privateKey) {
            throw new Error("Private key is not defined in .env file");
        }

        const providerUrl = `https://eth-sepolia.g.alchemy.com/v2/${alchemyApiKey}`;
        console.log("Provider URL:", providerUrl);
        const provider = new ethers.providers.JsonRpcProvider(providerUrl);

        const wallet = new ethers.Wallet(privateKey, provider);

        console.log("Deploying contracts with the account:", wallet.address);

        const NFTCollectionFactory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);

        const options = {
            gasLimit: 3000000,
            maxPriorityFeePerGas: ethers.utils.parseUnits('1', 'gwei'),
            maxFeePerGas: ethers.utils.parseUnits('10', 'gwei'),
        };

        const baseTokenURI = "https://ipfs.io/ipfs/QmQGxHEnAKrU41FtPnGnBBicqKgmntj63ZaD6uW9Ca6qKn/";
        const nft = await NFTCollectionFactory.deploy("MyNFTWithSignature", "MNFTS", baseTokenURI, options);

        console.log("Awaiting deployment...");
        await nft.deployTransaction.wait();

        console.log("NFTCollectionWithSignature deployed to:", nft.address);

        // Save the new contract address to a file for later use
        fs.writeFileSync('./config.js', `export const NFTCollectionAddress = "${nft.address}";\n`);
    } catch (error) {
        console.error("Error deploying contract:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Unexpected error deploying contract:", error);
    process.exit(1);
});
