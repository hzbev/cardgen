"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

import { useAppStore } from "@/helper/globalState";

export function RenderCardImage({wid, hei, mb }) {
  let image = useAppStore((state) => state.imageData)
  let photoBorderSize = useAppStore((state) => state.photoBorderSize)


  return (
    <div
      style={{ outlineStyle: image.length > 10 ? `solid` : "none", marginBottom: mb, outlineWidth: `${photoBorderSize}px` }}
    >
      <TransformWrapper
        initialScale={1}
        smooth={false}
        panning={{ velocityDisabled: true }}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              <div
                className="object-contain">
                <img
                  style={{ width: wid, height: hei, objectFit: "contain" }}
                  src={image}
                  width={wid}
                  height={hei}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}


export function RenderCardImageAbsolute({ showBorder, wid, hei, mb, topPos }) {
  let image = useAppStore((state) => state.imageData)
  let photoBorderSize = useAppStore((state) => state.photoBorderSize)

  return (
    <div
    className="absolute"
      style={{ outlineStyle: image.length > 10 ? `solid` : "none", marginBottom: mb, top: topPos, outlineWidth: `${photoBorderSize}px` }}
    >
      <TransformWrapper
        initialScale={1}
        smooth={false}
        panning={{ velocityDisabled: true }}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <>
            <TransformComponent>
              <div
                className="object-contain">
                <img
                  style={{ width: wid, height: hei, objectFit: "contain" }}
                  src={image}
                  width={wid}
                  height={hei}
                />
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

