import React, { createContext, useContext, useState } from 'react'
import { UserContext } from '../App'
import {Navigate} from "react-router-dom"
import BlogEditor from '../components/BlogEditor'
import PublishForm from '../components/PublishForm'

const blogStructure={
      title:'',
      banner:'',
      content:[],
      tags:[],
      des:'',
      author:{personal_info:{}}
}
export const EditorContext=createContext({})
function Editor() {
    const[blog,setBlog]=useState(blogStructure)
    const[editorState,setEditorState]=useState("editor")
    let {userAuth:{access_token}}=useContext(UserContext)
  return (
        <EditorContext.Provider value={{blog,setBlog,editorState,setEditorState}}>
        {
        access_token===null ? <Navigate to="/signin"/> : editorState=="editor"?<BlogEditor/>:<PublishForm/>
        }
        </EditorContext.Provider>
  )
}

export default Editor