//部署智能合约到真实的rankeby网络
const Web3 = require("web3")
const {interface,bytecode}=require("./compile")
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = "purchase yard bronze ......."; // 12 word mnemonic
const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/53da92f8cf274039922c718bb8010c2d");
const web3 = new Web3(provider);

deploy =async ()=>{
    console.log("111");
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const result =await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data:bytecode
        }).send({
            from:accounts[0],
            gas:'3000000'
        });
    console.log('address:'+result.options.address);
    console.log(interface)
};
deploy();