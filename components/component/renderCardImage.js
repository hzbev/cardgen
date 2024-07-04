"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export function RenderCardImage({ image, showBorder, wid, hei, mb }) {
  return (
    <div
      style={{ outlineStyle: image.length > 10 && showBorder ? "solid" : "none", marginBottom: mb }}
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

