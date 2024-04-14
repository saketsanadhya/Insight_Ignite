import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InPageNavigation";
import axios from "axios"
import Loader from "../components/Loader";
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
                      <h1>Blogs are in state</h1>
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
