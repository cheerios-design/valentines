"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PhotoPairGame from "../components/PhotoPairGame";
import ValentinesProposal from "@/components/ValentinesProposal";
import TextFooter from "@/components/TextFooter";
import OrientationGuard from "@/components/OrientationGuard";

const ANIM_DURATION = 2;

export default function Home() {
  const [showValentinesProposal, setShowValentinesProposal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleShowProposal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowValentinesProposal(true);
    }, ANIM_DURATION * 1000);
  };

  return (
    <OrientationGuard>
      <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-rose-900 via-pink-900 to-red-900 overflow-hidden relative">
        {/* Valentine background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">💕</div>
          <div className="absolute top-20 right-20 text-6xl">💖</div>
          <div className="absolute bottom-20 left-20 text-7xl">💝</div>
          <div className="absolute bottom-10 right-32 text-9xl">❤️</div>
          <div className="absolute top-1/3 right-1/4 text-7xl">💗</div>
          <div className="absolute bottom-1/3 left-1/4 text-6xl">💓</div>
        </div>
        {!showValentinesProposal ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isTransitioning ? 0 : 1 }}
            transition={{ duration: ANIM_DURATION }}
            className="flex flex-col items-center"
          >
            <PhotoPairGame handleShowProposal={handleShowProposal} />
            <div className="mt-4 md:mt-0">
              <TextFooter />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: ANIM_DURATION }}
          >
            <ValentinesProposal />
          </motion.div>
        )}
      </main>
    </OrientationGuard>
  );
}
