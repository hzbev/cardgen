"use client"

import React from "react";

import {
  TransformWrapper,
  TransformComponent,
} from "react-zoom-pan-pinch";

export default function RenderCardImage() {

  let image = "https://cdn.discordapp.com/attachments/831862551956422666/1257712958956503070/how-to-draw-pikachu.png?ex=668567f8&is=66841678&hm=de960ff26e0c9caa2bf11eebcb6607f68ca871b766a758de48bfc0985b56a550&"
  return (
      <div className="m-10 w-[250px] outline">
        <TransformWrapper
          initialScale={1}
          smooth={false}
          panning={{ velocityDisabled: true }}
          wheel={{ step: 0.1 }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <TransformComponent>
                <div className="mb-4 object-cover min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px]">
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

