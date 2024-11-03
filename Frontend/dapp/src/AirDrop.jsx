import { useConnection , useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState , useCallback} from "react"
import { SystemProgram, Transaction ,PublicKey} from '@solana/web3.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function AirDrop(){

  
   const [getValue , setValue] = useState(0)
   const [balance,setBalance] = useState(0)
   const [transferSol , setTransferSol] = useState("")
   const [amountTransfer , setAmountTransfer] = useState(0)
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

   // Sending Money

   const TransFerSolToOther = useCallback(async()=>{


    try{
        const lamports = parseInt(amountTransfer);
        const recipientPublicKey = new PublicKey(transferSol);
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: recipientPublicKey,
                lamports,
            })
        );
    
        const {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight }
        } = await connection.getLatestBlockhashAndContext();
    
    
        const signature = await wallet.sendTransaction(transaction, connection, { minContextSlot });
    
        await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });

        toast.success("Sended Money to your Friend ")
        setAmountTransfer("")
        setTransferSol("")
        console.log("failed")
    
    }

    catch(error){
        console.log("Some error occured :" + error)
        toast.error("some error" + error)
    }
    

   },[wallet.publicKey,connection,wallet.sendTransaction,amountTransfer,transferSol])


    return(
        <>

        <h1 className="relative top-[20px] font-normal text-[30px] text-red-600">Welcome Sir, <span className="text-[20px] font-light text-white">{wallet.publicKey ? wallet.publicKey.toString() : "Guest Account"}</span></h1> 
        <p className="text-[20px] relative top-[20px] text-blue-700 font-medium">Your Current Balance is  : <span className="font-bold text-white">{balance} <span className="font-extralight">SOL</span></span></p>             
        <div className="flex flex-col space-y-9 relative top-[50px]">
        <input value={getValue} onChange={(e)=>setValue(e.target.value)} placeholder="Enter the Amount" className="border-black border-2 rounded-lg p-4 font-bold text-black w-[500px]"></input>
        <div className="flex justify-center items-center">
        <button onClick={sendDrop} className="bg-green-500 submit-btn p-2 text-white rounded-lg font-bold w-[400px] text-[20px]">Send AirDrop</button>
        </div>
        </div>

        <hr></hr>
       
        <div className="h-[500px] w-auto relative top-[100px] flex flex-col space-y-9">
            <h1 className="text-center text-[60px] font-bold text-white">Transfer Sol</h1>
            <div className="flex flex-col space-y-8 justify-center items-center space-x-9">
            <input onChange={(e)=>setTransferSol(e.target.value)} placeholder="Enter public key" className="w-[500px] border-2 border-black rounded-lg p-3 font-bold text-black"></input>
            <input value={amountTransfer} onChange={(e)=>setAmountTransfer(e.target.value)} placeholder="Enter Amount" className="p-3 border-2 border-black rounded-lg font-bold text-black"></input>
            </div>
            <button onClick={TransFerSolToOther} className="p-2 submit-btn bg-blue-700 rounded-lg font-bold mybtn hover:cursor-pointer text-[25px] text-white">Drop AirDrop</button>
        </div>

        <ToastContainer />
        </>
    )
}