"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export function RenderCardImage({ image, showBorder, wid, hei, mb, borderPX }) {
  return (
    <div
      style={{ outlineStyle: image.length > 10 ? `solid` : "none", marginBottom: mb, outlineWidth: `${borderPX}px` }}
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


export function RenderCardImageAbsolute({ image, showBorder, wid, hei, mb, topPos, borderPX }) {
  return (
    <div
    className="absolute"
      style={{ outlineStyle: image.length > 10 ? `solid` : "none", marginBottom: mb, top: topPos, outlineWidth: `${borderPX}px` }}
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

