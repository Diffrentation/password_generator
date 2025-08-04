import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function App() {
  const [password, setpassword] = useState("");
  const [includeNumbers, setIncludeNumbeers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [length, setLength] = useState(8);

  // useRef hook
  const passRef=useRef();
   const PasswordGenerator= useCallback(()=>{
      let pass="";
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(includeNumbers){
        str+="0123456789";
        
      }
      if(includeSpecialChars){
        str+="~`!@#$%^&*()_-+=?/>,.<{}[]|"        
      }
      for(let i=0;i<length;i++){
        let char=Math.floor(Math.random()*str.length);
        console.log(char);
         pass+=str.charAt(char);
      }
      setpassword(pass);

    },[length,includeNumbers,includeSpecialChars,password]);

  const copyPassToClipboard=useCallback(()=>{
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0,5) // it can seletct particulor renge of value 
    window.navigator.clipboard.writeText(password)
  },[password])
    
    useEffect(()=>{
      PasswordGenerator();
    },[length,includeNumbers,includeSpecialChars])

    let copyPass

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Password Generator
        </h1>

        <div className="relative">
          <input
            type="text"
            value={password}
            ref={passRef}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full border rounded-xl py-2 px-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Your secure password"
          />
          <button
            className="absolute right-2 top-2.5 text-blue-600 hover:text-blue-800"
            title="Copy to clipboard"
            onClick={copyPassToClipboard}
          >
            <FaCopy />
          </button>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password Length: <span className="font-bold text-blue-600">{length}</span>
          </label>
          <input
            type="range"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="6"
            max="30"
            className="w-full accent-blue-600 cursor-pointer"
          />{" "}
        </div>

        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => {
                setIncludeNumbeers(!includeNumbers);
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Include Numbers</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => {
                setIncludeSpecialChars(!includeSpecialChars);
              }}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="text-gray-700">Include Special Characters</span>
          </label>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        onClick={PasswordGenerator}
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}
