import React,{useState,useEffect} from 'react'


export default function  DashBoard (){
    const[title,setTitle]= useState("")
    const[amt,setAmt]= useState("")
    const [debit,setDebit] =useState(0)
    const [credit,setCredit] =useState(0)
    const [balance,setBalance] =useState(0)

    return (
        <>
        <div>
            <div>Total Debit :{debit}</div>
            <div>Total Credit :{credit}</div>
            <div>Total Balance :{balance}</div>
        </div>
        <div>
            <form>
               
            <input placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
            <input placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/><br/>
            <input placeholder="Enter Title" value={amt} onChange={(e)=>setAmt(e.target.value)}/><br/>
            <button>ADD</button>
            </form>
        </div>
        </>
    )
}




