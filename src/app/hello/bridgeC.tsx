'use client'
import AElfBridge from 'aelf-bridge';
import {useState} from 'react';
import VConsole from 'vconsole';
import SButton from './sentry-case/components/Button';
const vConsole = new VConsole();
// or init with options
export default function BridgePage() {
  const [bridgeInstance, setBridgeInstance] = useState<any>(null);
  const [account, setAccount] = useState();
  const [transactionId, setTransactionId] = useState<any>();
  return <>
    <SButton onClick={() => {
      console.log('AElfBridge: ', AElfBridge);
      const bridgeInstance = new AElfBridge({
        timeout: 20000,
        endpoint: 'https://tdvv-public-node.aelf.io',
      });
      bridgeInstance.connect().then((isConnected: boolean) => {
        console.log('isConnected', isConnected);
        bridgeInstance.account().then((res: any) => {
          setAccount(res);
          console.log('account:', res);
        })
        setBridgeInstance(bridgeInstance);
      }).catch((err: any) => {
        console.log('err:', err);
      });
    }}
    >Step1: Click to Login</SButton>
    {/*<SButton onClick={() => {*/}
    {/*  if (!bridgeInstance) {*/}
    {/*    console.log('Please login first');*/}
    {/*    return;*/}
    {/*  }*/}
    {/*  bridgeInstance.account().then((res: any) => {*/}
    {/*    console.log('account:', res);*/}
    {/*  })*/}
    {/*}}>*/}
    {/*  Step2: click to get account*/}
    {/*</SButton>*/}
    {/*<SButton*/}
    {/*  onClick={() => {*/}
    {/*    console.log('Hello world', 'no end point');*/}
    {/*    if (!bridgeInstance) {*/}
    {/*      console.log('Please login first');*/}
    {/*      return;*/}
    {/*    }*/}
    {/*    const tokenAddress = 'ELF_7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX_tDVV'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取*/}
    {/*    bridgeInstance.chain.contractAt(tokenAddress).then(async (contract: any) => {*/}
    {/*      // const tokenInfo = await contract.GetTokenInfo.call({symbol: 'ELF'});*/}
    {/*      // console.log('tokenInfo: ', tokenInfo);*/}
    {/*      const transactionId = await contract.Approve({*/}
    {/*        amount: "10000000000",*/}
    {/*        spender: "FveRXL9PgVhMkoDcPh9jCkjF8WxW2K2aA72xAx4ngPqYnpNVw",*/}
    {/*        symbol: "ELF",*/}
    {/*      });*/}
    {/*      console.log(transactionId);*/}
    {/*      // alert('transactionId: ' + transactionId);*/}
    {/*    })*/}
    {/*  }}*/}
    {/*>*/}
    {/*  Click to Approve， Token*/}
    {/*</SButton>*/}
    <SButton
      onClick={async () => {
        if (!bridgeInstance) {
          console.log('Please login first');
          return;
        }
        const proposalContractAddress = '4SGo3CUj3PPh3hC5oXV83WodyUaPHuz4trLoSTGFnxe84nqNr'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
        const proposalContract = await bridgeInstance.chain.contractAt(proposalContractAddress);//.then(async (contract: any) => {
        console.log('proposalContract: ', proposalContractAddress);
        const transactionId = await proposalContract.Approve("831a9a4e6864ab9be76b0c9e6df96243f3214b21e4b2f25df4a51ffba315bf97");
        console.log('transactionId: ', transactionId);
        setTransactionId(transactionId);
      }}
    >
      Step2: Click to Approve the Proposal
    </SButton>
    <div className="break-all">
      {transactionId && transactionId.TransactionId && <>
        <div>Transaction Id: </div>
        <div>{transactionId.TransactionId}</div>
        <a href={`https://tdvv-explorer.aelf.io/tx/${transactionId.TransactionId}`}>Click to explorer</a>
      </>}
    </div>
    <div className="break-all">Proposal id: 831a9a4e6864ab9be76b0c9e6df96243f3214b21e4b2f25df4a51ffba315bf97</div>
    <div className="break-all">Account: {JSON.stringify(account)}</div>
    <div> --- </div>
    <div onClick={async () => {
      if (!bridgeInstance) {
        console.log('Please login first');
        return;
      }
      const proposalContractAddress = '4SGo3CUj3PPh3hC5oXV83WodyUaPHuz4trLoSTGFnxe84nqNr'; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
      const proposalContract = await bridgeInstance.chain.contractAt(proposalContractAddress);//.then(async (contract: any) => {
      console.log('proposalContract: ', proposalContractAddress);
      const transactionId = await proposalContract.Approve("9a0b558ac3e6d7e9c64c2bdc430045e317a2bb5c16dfa25dfc1de1586dfd998a");
      console.log('transactionId: ', transactionId);
      setTransactionId(transactionId);
    }}>Test only</div>
  </>
}
