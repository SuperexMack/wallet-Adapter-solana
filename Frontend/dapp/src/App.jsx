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
      <div className='h-auto main-screen w-full flex justify-center'>
         <div className='w-[60rem] h-auto  rounded-lg flex flex-col items-center space-y-4 p-5 z-50'>
            <h1 className='text-[50px] font-bold text-white'>Mack's Wallet Adapter</h1>
            <p className='text-[30px] text-white font-extralight'>This wallet Adapter do not add <img className='inline h-[40px] w-[40px]' src={solana}></img> in real </p>
            <p className='text-[20px] font-extralight text-white'>Please Switch to devnet to see these <img className='inline h-[40px] w-[40px]' src={solana}></img></p>
            <ConnectionProvider endpoint={"Add your rpc link here"}>
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
