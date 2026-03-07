"use client";

import { CakeSlice } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type SafeImageProps = Omit<ImageProps, "onError"> & {
  fallbackClassName?: string;
  fallbackLabel?: string;
};

export function SafeImage({
  alt,
  fallbackClassName,
  fallbackLabel = "Pastelería Encina",
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-[#F4EEE4] text-center text-[#8A7869] ${fallbackClassName ?? ""}`}
        role="img"
      >
        <div className="flex flex-col items-center gap-3 opacity-85">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCDBD] bg-white/60">
            <CakeSlice className="h-5 w-5" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">
            {fallbackLabel}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      onError={() => {
        setHasError(true);
      }}
    />
  );
}
