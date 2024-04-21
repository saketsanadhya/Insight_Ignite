import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/InPageNavigation";
import Loader from "../components/Loader";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/BlogPostCard";
import NoDataMessage from "../components/NoDataMessage";
import LoadMoreDataBtn from "../components/LoadMoreDataBtn";
import { FilterPaginationData } from "../common/FilterPaginationData";
import axios from "axios";
function SearchPage() {
  let { query } = useParams();
  let [blogs, setBlog] = useState(null);

    const searchBlogs=({page=1,create_new_arr=false})=>{
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs",{query,page})
        .then(async ({ data }) => {
            let formateData = await FilterPaginationData({
              state: blogs,
              data: data.blogs,
              page,
              countRoute: "/search-blogs-count",
              data_to_send:{query},
              create_new_arr
            })
            setBlog(formateData);
          })
          .catch((err) => {
            console.log(err);
          });
    }

    const resetState=()=>{
        setBlog(null)
    }
    useEffect(()=>{
        resetState()
        searchBlogs({page:1,create_new_arr:true})
    },[query])

  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search results from "${query}"`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}
        >
          <>
            {blogs == null ? (
              <Loader />
            ) : blogs.results.length ? (
              blogs.results.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}
                  >
                    <BlogPostCard
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message="No blogs published" />
            )}
            <LoadMoreDataBtn
              state={blogs}
              fetchDataFun={searchBlogs}
            />
          </>
        </InPageNavigation>
      </div>
    </section>
  );
}

export default SearchPage;
