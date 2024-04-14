import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InPageNavigation";
import axios from "axios"
import Loader from "../components/Loader";
import BlogPostCard from "../components/BlogPostCard";
function HomePage() {
  let[blogs,setBlog]=useState(null)
  const fetchLatestBlogs=()=>{
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs")
    .then(({data})=>{
      setBlog(data.blogs)
    })
    .catch(err=>{
      console.log(err);
    })
  }
  useEffect(()=>{
    fetchLatestBlogs()
  },[])
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
          {/* latest blogs */}
          <div className="w-full">
              <InPageNavigation routes={["home","trending blogs"]} defaultHidden={["trending blogs"]}>
                  <>
                    {
                      blogs==null ? <Loader/>:
                      blogs.map((blog,i)=>{
                        return <AnimationWrapper transition={{duration:1,delay:i*.1}} key={i}>
                          <BlogPostCard content={blog} author={blog.author.personal_info}/>
                        </AnimationWrapper>
                      })
                    }
                  </>
                  <h1>Trending blogs here</h1>
              </InPageNavigation>
          </div>
          {/* filters and trending blogs */}
          <div>

          </div>
      </section>
    </AnimationWrapper>
  );
}

export default HomePage;
