import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [charAllowed, setCharAllowed]= useState(false);
  const [numAllowed, setNumAllowed]= useState(false);
  const [password, setPassword]= useState('');
  
  let passwordRef= useRef(null);

// Code to copy the content inside div. if input is replaced by div.

// first create a selection object from window.
// then create a range object from document.
// target and select the text through range.selectNodeContent(targetText).
// clear all previous selection through selection.removeAllRanges().
// add new content/range to selection object through selection.addRange(range).

  // const copyToClipboard = () => {
  //   const selection = window.getSelection();   // gets current text selection object from the browser. 
  //   const range = document.createRange(); // creates a range object which represents a portion of document.
  //   range.selectNodeContents(passwordRef.current);  // full text inside the element is selected.
  //   selection.removeAllRanges();                    // remove all previous selections.
  //   selection.addRange(range);                      // add the newly created range to the selection.
  //   window.navigator.clipboard.writeText(password); // copy the password to clipboard.
  // };


  function copyPasswordToClipboard() {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,3);
    window.navigator.clipboard.writeText(password);  
  }

  let generatePassword= useCallback(()=>{
    let password='';
    let string='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if(charAllowed) string+='.,<>?/{}[]$#%^&*!@';
    if(numAllowed) string+='0123456789';

    for(let i=1; i<=length; i++){
      password+= string.charAt(Math.floor(Math.random() * (string.length - 0) + 0));
    }

    setPassword(password);    
  },[length, numAllowed, charAllowed]);

  useEffect(()=>{
    generatePassword();
  }, [length, numAllowed, charAllowed]);

  return (
    <>
      <h1 className='text-white text-4xl text-center mt-20'>Password Generator</h1>

      <div className='border-white border-2 w-150 h-30 rounded-md mx-auto mt-10 bg-gray-800 flex items-center justify-center flex-col'>
        <div className='w-9/10 h-1/3 rounded-md flex'>
          <input
            readOnly
            type="text" 
            placeholder='Password' 
            className='cursor-pointer h-full w-8/10 bg-white rounded-l-md p-4 outline-none' 
            value={password} 
            ref={passwordRef}
            />
          <button 
            className='h-full w-2/10 bg-blue-900 text-white flex justify-center items-center text-xl rounded-r-md hover: cursor-pointer'
            onClick={copyPasswordToClipboard}
            >Copy</button>
        </div>
        <div className='w-9/10 h-1/3 flex items-center gap-10'>
          <div className='flex gap-2'>
            <input min={5} max={20} type="range" name="" id="" defaultValue={length} onChange={(e)=>{
              setLength(e.target.value);
            }} />
            <p className='text-white text-lg'>Length({length})</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" name="" id="" onChange={(e)=>{
              setNumAllowed(e.target.checked);
            }} />
            <p className='text-white text-lg'>Numbers</p>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" name="" id="" onChange={(e)=>{
              setCharAllowed(e.target.checked);
            }} />
            <p className='text-white text-lg'>Characters</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
