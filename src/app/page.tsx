"use client";

import { UploadImage } from "@/components/upload-image";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="max-w-[60rem] mx-auto">
        <motion.h1
          className="bg-gradient-to-br from-slate-400 via-black to-slate-400 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
        >
          <Balancer>Captivating and accessible tweets from your pics</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={{
            hidden: { opacity: 0, y: -10 },
            show: { opacity: 1, y: 0, transition: { type: "spring" } },
          }}
        >
          <Balancer ratio={0.6}>
            Not sure about what to tweet with those pictures? Let the AI come to
            the rescue! Create powerful tweets with accessible images that take
            your content to new horizons.
          </Balancer>
        </motion.p>
      </div>
      <UploadImage />
    </motion.div>
  );
};

export default Home;
