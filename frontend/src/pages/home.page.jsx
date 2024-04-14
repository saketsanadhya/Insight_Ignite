import React from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InPageNavigation";
function HomePage() {
  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
          {/* latest blogs */}
          <div className="w-full">
              <InPageNavigation routes={["home","trending blogs"]} defaultHidden={["trending blogs"]}>
                  <h1>Latest blogs here</h1>
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
