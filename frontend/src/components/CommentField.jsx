import React, { useState } from 'react'

function CommentField({action}) {
    const[comment,setComment]=useState("")
  return (
    <>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} placeholder='Leave a comment....' className='resize-none input-box pl-5 placeholder:text-dark-grey h-[150px] overflow-auto'></textarea>
        <button className='btn-dark mt-5 px-10'>{action}</button>
    </>
  )
}

export default CommentField