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

        <h1 className="relative top-[20px] font-normal text-[30px]">Welcome Sir with Public Key - <span className="text-[20px]">{wallet.publicKey ? wallet.publicKey.toString() : "Guest Account"}</span></h1> 
        <p className="text-[20px] font-normal relative top-[20px]">Your Current Balance is  : <span>{balance}</span></p>             
        <div className="flex space-x-9 relative top-[50px]">
        <input value={getValue} onChange={(e)=>setValue(e.target.value)} placeholder="Enter the Amount" className="border-black rounded-lg p-4 font-bold"></input>
        <div className="flex justify-center items-center">
        <button onClick={sendDrop} className="bg-black p-4 text-white w-[200px] rounded-lg font-bold">Send AirDrop</button>
        </div>
        </div>

        <hr></hr>
       
        <div className="h-[500px] w-auto relative top-[100px] flex flex-col space-y-9">
            <h1 className="text-center text-[60px] font-bold">Transfer Sol</h1>
            <div className="flex justify-center space-x-9">
            <input onChange={(e)=>setTransferSol(e.target.value)} placeholder="Enter public key" className="w-[500px] border-black rounded-lg p-3 font-bold"></input>
            <input value={amountTransfer} onChange={(e)=>setAmountTransfer(e.target.value)} placeholder="Enter Amount" className="p-3 border-black rounded-lg font-bold "></input>
            </div>
            <button onClick={TransFerSolToOther} className="p-3 bg-blue-700 rounded-lg font-bold mybtn hover:cursor-pointer text-[25px]">Drop AirDrop</button>
        </div>

        <ToastContainer />
        </>
    )
}