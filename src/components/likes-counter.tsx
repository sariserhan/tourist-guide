"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

const LikesCounter = ({ likes, className }: { likes: number, className?: string }) => {
  const [prevLikes, setPrevLikes] = useState(likes);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevLikesRef = useRef(likes);

  useEffect(() => {
    if (likes !== prevLikesRef.current) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setPrevLikes(likes);
        prevLikesRef.current = likes;
      }, 500); // Duration of the animation
    }
  }, [likes]);

  // Calculate the width based on the number of digits in likes
  const containerWidth = `${likes.toString().length * 0.75 + 1.5}em`;

  return (
    <div className="likes-container" style={{ width: containerWidth }}>
      <div className={cn("likes-wrapper", className)}>
        <div className={`likes ${isAnimating ? "animate-exit" : "center"}`}>
          {prevLikes}
        </div>
        {isAnimating && (
          <div className={`likes ${isAnimating ? "animate-enter" : ""}`}>
            {likes}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikesCounter;
