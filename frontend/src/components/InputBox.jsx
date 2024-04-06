import React, { useState } from 'react';

function InputBox({name, placeholder, type, id, value,icon}) {
    const[passwordVisibility,setPasswordVisibility]=useState(false)
  return (
    <div className='relative w-[100%] mb-4'>
      <input 
        name={name}
        placeholder={placeholder}
        type={type=="password"?passwordVisibility?"text":"password":type}
        id={id}
        defaultValue={value} 
        className='input-box'
        
      />
      <i className={"fi " + icon + " input-icon"}></i>
      {
        type=="password"?
        <i className={"fi fi-rr-eye" + (!passwordVisibility?"-crossed":"")+" input-icon left-[auto] right-4 cursor-pointer"}
        onClick={()=>setPasswordVisibility(curr=>!curr)}
        ></i>:""
        
      }
    </div>
  );
}

export default InputBox;
