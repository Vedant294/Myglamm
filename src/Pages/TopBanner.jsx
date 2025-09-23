/* eslint-disable no-unused-vars */
import banner1 from "../assets/desktop/dummybanner.png";
import banner from "../assets/desktop/banner.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function TopBanner() {
  const navigate=useNavigate();
  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1}}
        transition={{duration:2}} className="relative w-full pt-32 md:pt-20"
        onClick={()=>navigate("/shop")}
        >
       {/* Desktop Banner */}
       <img
        src={banner1}
        alt="Desktop Banner"
        className="hidden md:block object-fit w-full  h-[600px]"
      />

      {/* Mobile Banner */}
      <img
        src={banner}
        alt="Mobile Banner"
        className="block md:hidden w-full h-[400px] object-cover"
      />
    </motion.div>
  );
}

export default TopBanner;
