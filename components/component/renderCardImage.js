"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export function RenderCardImage({image}) {
  return (
      <div className="mb-4 outline min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px]">
        <TransformWrapper
          initialScale={1}
          smooth={false}
          panning={{ velocityDisabled: true }}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <TransformComponent>
                <div className="object-cover min-h-[300px] min-w-[300px] max-h-[300px] max-w-[300px]">
                  <img src={image}
                    width={300}
                    height={300}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
  );
}

