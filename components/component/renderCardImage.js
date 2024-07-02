"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export function RenderCardImage({image}) {
  return (
      <div className="m-4 outline min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px]">
        <TransformWrapper
          initialScale={1}
          smooth={false}
          panning={{ velocityDisabled: true }}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <TransformComponent>
                <div className="object-cover min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px]">
                  <img src={image}
                    width={250}
                    height={250}
                  />
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>
  );
}

