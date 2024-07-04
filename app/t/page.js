"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"

import { RenderCardImage } from "../../components/component/renderCardImage"
import { useEffect, useRef } from 'react';

export default function Heheheh() {

  const imageRef = useRef(null);

  useEffect(() => {
    fetch('/api/test', {
      method: "POST",
      body: {
        "imageBlob": "hihihi",
        "svgConfig": "hehehe"
      },
      redirect: "follow"
    })
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        imageRef.current.src = url;
        const link = document.createElement("a");
        link.href = url;
        link.download = "image.png";
        link.click();
      });
  }, []);

  return <img ref={imageRef} alt="Example" />;
}


const Icon = ({ fill }) => {
  return (
    <svg>
      <symbol id="umbrella" viewBox="0 0 596 597">
        <title>Umbrella</title>
        <desc>Umbrella icon</desc>
        <path fill={fill} class="shaft" d="M260.4,335.7 L260.4,478 C260.4,543.1 313.4,596.1 378.5,596.1 C443.6,596.1 496.6,543.1 496.6,478 C496.6,457.5 479.9,440.8 459.4,440.8 C438.9,440.8 422.2,457.5 422.2,478 C422.2,502.2 402.7,521.7 378.5,521.7 C354.3,521.7 334.8,502.2 334.8,478 L334.8,335.7 L260.4,335.7 L260.4,335.7 Z"></path>
        <path class="fabric" d="M558,335.7 C578.5,335.7 595.2,319 595.2,298.5 L595.2,294.8 C593.4,132 460.4,0.9 297.6,0.9 L297.6,0.9 C133.9,0.9 0,134.8 0,298.5 C0,319 16.7,335.7 37.2,335.7 L558,335.7 L558,335.7 Z M77.2,261.3 C94.9,156.2 187,75.3 297.6,75.3 C408.2,75.3 500.4,156.2 518,261.3 L77.2,261.3 L77.2,261.3 Z"></path>
      </symbol>
    </svg>
  )
};

