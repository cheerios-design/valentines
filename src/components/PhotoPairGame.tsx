"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

// 18 actual images + 1 special text card
const images = [
  "/game-photos/IMG_1217.HEIC",
  "/game-photos/IMG_1219.HEIC",
  "/game-photos/IMG_1266.HEIC",
  "/game-photos/IMG_1298.HEIC",
  "/game-photos/IMG_1305.HEIC",
  "/game-photos/IMG_1312.HEIC",
  "/game-photos/IMG_1316.HEIC",
  "/game-photos/IMG_1479.HEIC",
  "/game-photos/IMG_1520.HEIC",
  "/game-photos/IMG_1530.HEIC",
  "/game-photos/IMG_1678.JPG",
  "/game-photos/IMG_0473.HEIC",
  "/game-photos/IMG_0516.HEIC",
  "/game-photos/IMG_0517.HEIC",
  "/game-photos/IMG_0525.HEIC",
  "/game-photos/IMG_1211.HEIC",
  "/game-photos/IMG_1212.HEIC",
  "/game-photos/IMG_1213.HEIC",
  "SPECIAL_TEXT_CARD", // 19th item - special text card
];

// Create 19 pairs (38 cards total)
const imagePairs = images.flatMap((image) => [image, image]);

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const heartLayout = [
  [null, null, 0, 1, null, 2, 3, null, null],
  [null, 4, 5, 6, 7, 8, 9, 10, null],
  [11, 12, 13, 14, 15, 16, 17, 18, 19],
  [null, 20, 21, 22, 23, 24, 25, 26, null],
  [null, null, 27, 28, 29, 30, 31, null, null],
  [null, null, null, 32, 33, 34, null, null, null],
  [null, null, null, 35, 36, 37, null, null, null],
];

type ValentinesProposalProps = {
  handleShowProposal: () => void;
};

export default function PhotoPairGame({
  handleShowProposal,
}: ValentinesProposalProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [incorrect, setIncorrect] = useState<number[]>([]);
  const [images] = useState(() => shuffleArray([...imagePairs]));

  const handleClick = async (index: number) => {
    if (selected.length === 2 || matched.includes(index) || selected.includes(index)) return;

    if (selected.length === 1) {
      const firstIndex = selected[0];
      setSelected((prev) => [...prev, index]);

      if (images[firstIndex] === images[index]) {
        setMatched((prev) => [...prev, firstIndex, index]);
        setSelected([]);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

        setIncorrect([firstIndex, index]);
        setTimeout(() => setIncorrect([]), 1000); // Clear incorrect after 1 second
        setTimeout(() => setSelected([]), 1000);
      }
    } else {
      setSelected([index]);
    }
  };

  // Check if game is won
  useEffect(() => {
    if (matched.length === imagePairs.length) {
      handleShowProposal();
    }
  }, [matched, handleShowProposal]);

  return (
    <div className="grid grid-cols-9 gap-1 lg:gap-2 max-w-[95vw] mx-auto place-items-center">
      {/* Image preload */}
      <div className="hidden">
        {images.map((image, i) =>
          image !== "SPECIAL_TEXT_CARD" ? (
            <Image
              key={i}
              src={image}
              alt={`Image ${i + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : null
         />
        ))}
      </div>

      {heartLayout.flat().map((index, i) =>
        index !== null ? (
          <motion.div
            key={i}
            className="w-[11vh] h-[11vh] lg:w-20 lg:h-20 relative cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => handleClick(index)}
            style={{ perspective: "1000px" }} // Add perspective for 3D effect
          >
            {/* Back of the card */}
            {!selected.includes(index) && !matched.includes(index) && (
              <motion.div
                className="w-full h-full bg-gray-300 rounded-sm lg:rounded-md absolute z-10"
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    selected.includes(index) || matched.includes(index)
                      ? 180
                      : 0,
                }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              />
            )}

            {/* Front of the card (image or text) */}
            {(selected.includes(index) || matched.includes(index)) && (
              <motion.div
                className="w-full h-full absolute"
                initial={{ rotateY: -180 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.5 }}
                style={{ backfaceVisibility: "hidden" }}
              >
                {images[index] === "SPECIAL_TEXT_CARD" ? (
                  <div className="w-full h-full bg-gradient-to-br from-pink-300 via-red-300 to-pink-400 rounded-sm lg:rounded-md flex items-center justify-center">
                    <span className="font-[family-name:var(--font-great-vibes)] text-4xl lg:text-5xl text-white drop-shadow-lg">
                      HƏBIBƏ
                    </span>
                  </div>
                ) : (
                  <Image
                    src={images[index]}
                    alt={`Imagen ${index + 1}`}
                    fill
                    className="rounded-sm lg:rounded-md object-cover"
                  />
                )}
              </motion.div>
            )}

            {/* Incorrect animation */}
            {incorrect.includes(index) && (
              <motion.div
                className="absolute inset-0"
                animate={{ scale: [1, 1.1, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-red-500 rounded-sm lg:rounded-md"></div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <div key={i} className="w-[11vh] h-[11vh] lg:w-20 lg:h-20" />
        ),
      )}
    </div>
  );
}
