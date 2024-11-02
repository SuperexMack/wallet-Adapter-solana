import { useConnection , useWallet } from "@solana/wallet-adapter-react"
import { useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AirDrop(){
   
   const [getValue , setValue] = useState(0)
   let wallet = useWallet()
   let {connection} = useConnection()

   const sendDrop = async()=>{
    await connection.requestAirdrop(wallet.publicKey , parseInt(getValue))
    setValue("")
    toast.success("Sol Added successfully")
   }


    return(
        <>

        <h1 className="relative top-[20px] font-bold text-[30px]">Welcome Sir with Public Key - <span className="text-[20px]">{wallet.publicKey ? wallet.publicKey.toString() : "Guest Account"}</span></h1>              
   
        <div className="flex space-x-9 relative top-[50px]">
        <input value={getValue} onChange={(e)=>setValue(e.target.value)} placeholder="Enter the Amount" className="border-black rounded-lg p-4 font-bold"></input>
        <div className="flex justify-center items-center">
        <button onClick={sendDrop} className="bg-black p-4 text-white w-[200px] rounded-lg font-bold">Send AirDrop</button>
        </div>
        </div>
        <ToastContainer />
        </>
    )
}