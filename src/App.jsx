import { useCallback, useState,useEffect,useRef } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numAllowed,setNumAllow]=useState(false);
  const [charAllowed,setCharAllow]=useState(false);
  const [password,setPassword]=useState("")

  // useRef hook
  const passwordRef=useRef(null);

   
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabccdefghijklmnooqrstuvwxyz"
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%&^*+-="
    for(let i=1;i<=length;i++){
      let randomChar=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(randomChar);
    }

    setPassword(pass);
    
  },[length,numAllowed,charAllowed,setPassword])

  const copyPassword=()=>{
    passwordRef.current.select();
    passwordRef.current.setSelectionRange(0, 100);
    document.execCommand("copy");
  }

  useEffect(()=>{passwordGenerator()},[length,numAllowed,charAllowed,passwordGenerator])

  return (
    <>
     

    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black-400 bg-gray-800 font-bold'>
     <h1 className='text-4xl text-center text-white mb-6'>password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type='text' value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}>
        </input>
        <button className='outline-node bg-blue-800 text-white px-3 py-.5 shrink mx-1 rounded-lg hover:bg-green-900'onClick={copyPassword} >Copy</button>
      </div>
      <div className='flex flex-wrap -mx-3 mb-6'>
        <div className='flex item-center gap-x-1'>
          <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}></input>
          <label>Length:{length}</label>
        </div>
        <input  type='checkbox' defaultChecked={numAllowed} id='numInput' onChange={()=>{
          setNumAllow((prev)=>!prev)
        }} className='mx-2 '></input> <label>Numbers</label>
          <input type='checkbox' defaultChecked={charAllowed} id='numInput' onChange={()=>{
          setCharAllow((prev)=>!prev)
        }} className='mx-2'></input> <label>Charactor</label>
      </div>
              <button onClick={ passwordGenerator} className='outline-node bg-blue-800 text-white px-3 py-.5 shrink mx-1 rounded-lg hover:bg-green-900 d-flex jus-center ml-40 mb-2'>Next</button>

    </div>
    </>
    
  )
}

export default App
