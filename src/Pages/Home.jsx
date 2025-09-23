import React from "react";
import TopBanner from "./TopBanner";
import Bestseller from "./BestsellerProduct";
import Oily from "./OilyProduct";
import Dry from "./DryProduct";
import Combinaton from "./CombinationProduct";
import Sensitive from "./SensitiveProduct";
function Home() {
  return (
    <div className="w-full ">
      <TopBanner />
      <Bestseller />
      <Oily />
      <Dry />
      <Combinaton />
      <Sensitive />
    </div>
  );
}

export default Home;
