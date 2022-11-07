const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'weird narrow business focus husband suit initial elephant truck often detect honey',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/77cf22b9ae98442abb6264e0e4de3d6f'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

//   console.log(interface)
  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
