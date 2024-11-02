import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import solana from "./solanaa.png"
import { AirDrop } from './AirDrop';


function App() {

  return (
    <>
      <div className='h-[1000px] main-screen w-full flex justify-center'>
         <div className='w-[60rem] h-auto flex flex-col items-center space-y-4 p-5 z-50'>
            <h1 className='mt-20 text-[50px] font-bold text-violet-700'>Welcome to Mack's Wallet Adapter</h1>
            <p className='text-[35px] text-pink-500 font-bold'>This wallet Adapter do not add <img className='inline h-[50px] w-[50px]' src={solana}></img> in real </p>
            <p className='text-[30px] font-medium'>Please Switch to devnet to see these <img className='inline h-[50px] w-[50px]' src={solana}></img></p>
            <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/1GcAeTdxUpNiEvq2IeIo_Cqm97P_J-R4"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <WalletMultiButton />
                    <WalletDisconnectButton />
                   <AirDrop></AirDrop>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
         </div>
      </div>
    </>
  )
}

export default App
