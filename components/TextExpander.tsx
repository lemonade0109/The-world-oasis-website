"use client";

import { useState } from "react";

import { TextExpanderProp } from "@/types/interfaces";

const TextExpander = ({ children }: TextExpanderProp) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let displayText;

  if (typeof children === "string") {
    displayText = isExpanded
      ? children
      : children.split(" ").slice(0, 40).join(" ") + "...";
  }
  return (
    <span>
      {displayText}
      <button
        className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </span>
  );
};

export default TextExpander;
