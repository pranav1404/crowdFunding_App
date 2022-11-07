import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xf5F0812663517CF393d101e4c5ad6B5f2F561980'
);

export default instance;