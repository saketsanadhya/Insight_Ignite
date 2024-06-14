import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App'
import { FilterPaginationData } from '../common/FilterPaginationData'
import { Toaster } from 'react-hot-toast'
import InPageNavigation from '../components/InPageNavigation'
import Loader from '../components/Loader'
import NoDataMessage from '../components/NoDataMessage'
import AnimationWrapper from '../common/page-animation'
import ManagePublishedBlogCard from '../components/ManagePublishedBlogCard'

function ManageBlogs() {

    const[blogs,setBlogs]=useState(null)
    const[drafts,setDrafts]=useState(null)
    const[query,setQuery]=useState("")

    let{userAuth:{access_token}}=useContext(UserContext)

    const getBlogs=({page,draft,deleteDocCount=0})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN+ "/user-written-blogs",{page,draft,query,deleteDocCount},{
            headers:{
                'Authorization':`Bearer ${access_token}`
            }
        })
        .then(async({data})=>{
            let formatedData=await FilterPaginationData({
                state:draft ? drafts : blogs,
                data:data.blogs,
                page,
                user:access_token ,
                countRoute:"/user-written-blogs-count",
                data_to_send:{draft,query}
            })

            console.log(formatedData);

            if(draft){
                setDrafts(formatedData)
            }
            else{
                setBlogs(formatedData)
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    useEffect(()=>{

        if(access_token){
            if(blogs==null){
                getBlogs({page:1,draft:false})
            }
            if(drafts==null){
                getBlogs({page:1,draft:true})
            }
        }
        
    },[access_token,blogs,drafts,query])

    const handleSearch=(e)=>{
        let searchQuery=e.target.value
        setQuery(searchQuery)
        if(e.keyCode==13 && searchQuery.length){
            setBlogs(null)
            setDrafts(null)
        }
    }

    const handleChange=(e)=>{
        if(e.target.value.length){
            setQuery("")
            setBlogs(null)
            setDrafts(null)
        }
    }

  return (
    <>
        <h1 className='max-md:hidden'>Manage Blogs</h1>
        <Toaster/>
        <div className='relative max-md:mt-5 md:mt-8 mb-10'>

            <input type="search" className='w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey' placeholder='Search Blogs' onChange={handleChange} onKeyDown={handleSearch}/>
            <i className='fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl'></i>
 
        </div>

        <InPageNavigation routes={["Published Blogs", "Drafts"]}>

            {
                blogs==null ? <Loader/> : 
                blogs.results.length ? 
                    <>
                        {
                            blogs.results.map((blog,i)=>{
                                return <AnimationWrapper key={i} transition={{delay:i*0.04}}>
                                  <ManagePublishedBlogCard blog={blog}/>  
                                </AnimationWrapper>
                            })
                        }
                    </>
                : <NoDataMessage message="No data message"/>
            }

        </InPageNavigation>

    </>
  )
}

export default ManageBlogs