import React from "react";
import loader2 from "../assets/loader2.json";
import Lottie from "lottie-react";

const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={loader2} loop={true} />
    </div>
  );
};

export default PageLoader;
