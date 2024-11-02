import { useConnection , useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState , useCallback} from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AirDrop(){

  
   const [getValue , setValue] = useState(0)
   const [balance,setBalance] = useState(0)
   let wallet = useWallet()
   let {connection} = useConnection()

   const getTheBalanceData = useCallback(async()=>{
    if(wallet.publicKey){
        try{
            let storeTheBalance = await connection.getBalance(wallet.publicKey)
            setBalance(storeTheBalance/1e9)
        }
        catch(err){
            console.log("some error : " + err)
            toast.error("some error : " + err)
        }
    }
    
   },[wallet.publicKey,connection])

   useEffect(()=>{
    getTheBalanceData()
   },[connection,wallet.publicKey])

   const sendDrop = async()=>{
    
    await connection.requestAirdrop(wallet.publicKey , parseInt(getValue))
    setValue("")
    toast.success("Sol Added successfully")
   }


    return(
        <>

        <h1 className="relative top-[20px] font-normal text-[30px]">Welcome Sir with Public Key - <span className="text-[20px]">{wallet.publicKey ? wallet.publicKey.toString() : "Guest Account"}</span></h1> 
        <p className="text-[20px] font-normal relative top-[20px]">Your Current Balance is  : <span>{balance}</span></p>             
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