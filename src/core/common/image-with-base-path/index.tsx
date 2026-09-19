
"use client";
/* eslint-disable @next/next/no-img-element */

import { image_path } from "@/environment";
import React, { useState, useEffect } from "react";

const DEFAULT_IMAGE = "assets/img/items/default-food.svg";

interface Image {
  className?: string;
  src?: string | null;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
  style?: React.CSSProperties;
  defaultSrc?: string;
}

const ImageWithBasePath = (props: Image) => {
  const fallback = props.defaultSrc || DEFAULT_IMAGE;
  const rawSrc = props.src ? props.src.trim() : "";
  const initialSrc = rawSrc || fallback;

  const buildUrl = (path: string) => {
    if (!path) return `/${fallback}`;
    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
      return path;
    }
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${image_path}${cleanPath}`;
  };

  const [currentSrc, setCurrentSrc] = useState<string>(() => buildUrl(initialSrc));

  useEffect(() => {
    setCurrentSrc(buildUrl(props.src ? props.src.trim() : fallback));
  }, [props.src, fallback]);

  const handleError = () => {
    const fallbackUrl = buildUrl(fallback);
    if (currentSrc !== fallbackUrl) {
      setCurrentSrc(fallbackUrl);
    }
  };

  return (
    <img
      className={props.className}
      src={currentSrc}
      height={props.height}
      alt={props.alt || "image"}
      width={props.width}
      id={props.id}
      style={props.style}
      onError={handleError}
    />
  );
};

export default React.memo(ImageWithBasePath);

