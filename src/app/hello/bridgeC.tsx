'use client'
import AElfBridge from 'aelf-bridge';
import {useState} from 'react';
import VConsole from 'vconsole';
import SButton from './sentry-case/components/Button';
const vConsole = new VConsole();

/**
 * 临时用替换如下三个参数
 */
const PROPOSAL_ID = 'bdcd08ff2b69adedcb199c6c618c449cf8152734196328eec37de31b8528b792';
// AElf.ContractNames.Parliament AELF
// https://aelfscan.io/AELF/address/ELF_2JT8xzjR5zJ8xnBvdgBZdSjfbokFSbF5hDdpUCbXeWaJfPDmsK_AELF?tab=contract
const PROPOSAL_CONTRACT_ADDRESS = '2JT8xzjR5zJ8xnBvdgBZdSjfbokFSbF5hDdpUCbXeWaJfPDmsK';
// AElf.ContractNames.Parliament tDVV
// https://aelfscan.io/tDVV/address/ELF_4SGo3CUj3PPh3hC5oXV83WodyUaPHuz4trLoSTGFnxe84nqNr_tDVV?tab=contract
// const PROPOSAL_CONTRACT_ADDRESS = '4SGo3CUj3PPh3hC5oXV83WodyUaPHuz4trLoSTGFnxe84nqNr';
const END_POINT = 'https://aelf-public-node.aelf.io';
// const END_POINT = 'https://tdvv-public-node.aelf.io'; // sidechain tdvv
const EXPLORER_URL = 'https://aelfscan.io/AELF/tx/'; // AELF
// const EXPLORER_URL = 'https://aelfscan.io/tDVV/tx/'; // AELF

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
        endpoint: END_POINT,
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
        const proposalContractAddress = PROPOSAL_CONTRACT_ADDRESS; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
        const proposalContract = await bridgeInstance.chain.contractAt(proposalContractAddress);//.then(async (contract: any) => {
        console.log('proposalContract: ', proposalContractAddress);
        const transactionId = await proposalContract.Approve(PROPOSAL_ID);
        console.log('transactionId: ', transactionId);
        setTransactionId(transactionId);
      }}
    >
      Step2: Click to Approve the Proposal
    </SButton>
    <div className="break-all">
      {transactionId && transactionId.TransactionId && <>
        <div>Transaction Id:</div>
        <div>{transactionId.TransactionId}</div>
        <div>&nbsp;</div>
        <a href={`${EXPLORER_URL}${transactionId.TransactionId}`}>Click to explorer</a>
        <div>&nbsp;</div>
      </>}
    </div>
    <div className="break-all">Proposal id: {PROPOSAL_ID}</div>
    <div className="break-all">Account: {JSON.stringify(account)}</div>
    <div> --- </div>
    <div onClick={async () => {
      if (!bridgeInstance) {
        console.log('Please login first');
        return;
      }
      const proposalContractAddress = PROPOSAL_CONTRACT_ADDRESS; // 合约地址可通过零合约的`GetContractAddressByName`只读方法获取
      const proposalContract = await bridgeInstance.chain.contractAt(proposalContractAddress);//.then(async (contract: any) => {
      console.log('proposalContract: ', proposalContractAddress);
      const transactionId = await proposalContract.Approve("9a0b558ac3e6d7e9c64c2bdc430045e317a2bb5c16dfa25dfc1de1586dfd998a");
      console.log('transactionId: ', transactionId);
      setTransactionId(transactionId);
    }}>Test only</div>
  </>
}
