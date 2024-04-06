import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../imgs/logo.png"
import AnimationWrapper from '../common/page-animation'
import defaultBanner from "../imgs/blog banner.png"
function BlogEditor() {
    const handleBannerUpload=(e)=>{
        let img=e.target.files[0]
        console.log(img);
    }

    const handleTitleKeyDown=(e)=>{
        console.log(e);
        if(e.keyCode==13){
            e.preventDefault()
        }
    }
    const handleTitleChange=(e)=>{
        let input=e.target
        input.style.height='auto'
        input.style.height=input.scrollHeight+"px"
    }
  return (
    <>
         <nav className='navbar'>
        <Link to="/" className="flex-none w-10">
            <img src={logo} />
        </Link>
        <p className='max-md:hidden text-black line-clamp-1 w-full'>
            New Blog
        </p>
        <div className='flex gap-4 ml-auto'>
            <button className='btn-dark py-2'>
                Publish
            </button>
            <button className='btn-light py-2'>
                Save Draft
            </button>
        </div>
         </nav>
         <AnimationWrapper>
            <section>
                <div className='mx-auto max-w-[900px] w-full'>

                    <div className='relative aspect-video hover:opacity-80 bg-white border-4 border-grey'>
                        <label htmlFor="uploadBanner">
                            <img src={defaultBanner} className='z-20'/>
                            <input type="file" id='uploadBanner' accept='.png .jpg .jpeg' hidden onChange={handleBannerUpload}/>
                        </label>
                    </div>
                    <textarea placeholder='Blog Title' className='text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40' onKeyDown={handleTitleKeyDown} onChange={handleTitleChange}></textarea>
                </div>
            </section>
         </AnimationWrapper>
    </>
  )
}

export default BlogEditor