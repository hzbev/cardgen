
import { RenderCardImage, RenderCardImageAbsolute } from "./renderCardImage"
import Draggable from 'react-draggable'; // The default
import Moveable from "react-moveable";
import { useRef, useEffect } from "react";
import { useAppStore } from "@/helper/globalState";


export function CardPreset({ }) {
    let centerLocked = useAppStore((state) => state.centerLocked)

    let cardTitle = useAppStore((state) => state.title)
    let cardTitleWeight = useAppStore((state) => state.titleWeight)
    let titleColor = useAppStore((state) => state.titleColor)
    let descColor = useAppStore((state) => state.descColor)

    let cardType = useAppStore((state) => state.typeCard)
    let cardDesc = useAppStore((state) => state.desc)
    let layoutIndex = useAppStore((state) => state.layoutIndex)
    let descBorderSize = useAppStore((state) => state.descBorderSize)
    let customData = useAppStore((state) => state.customData)
    let selectedText = useAppStore((state) => state.selectedText)


    return (
        <>
            {layoutIndex == "1" &&
                <>
                    <RenderCardImage wid={300} hei={300} mb="16px" />
                    <div className="text-center text-wrap w-[90%] h-[28%]">
                        <div style={{ fontWeight: cardTitleWeight, color: titleColor }} className="text-2xl h-8 truncate">{cardTitle}</div>
                        <p className="h-[80%] text-wrap truncate max-h-[75%]" style={{ outlineStyle: descBorderSize > 0 ? `solid` : "none", outlineWidth: `${descBorderSize}px`, color: descColor }}>{cardDesc}</p>
                    </div>
                </>
            }

            {layoutIndex == "2" &&
                <>
                    <RenderCardImage wid={357} hei={488} mb="0" />
                    <div className="text-center text-wrap w-[90%] absolute z-30 mt-[450px]">
                        <div style={{ fontWeight: cardTitleWeight, color: titleColor }} className="text-2xl font-bold h-[100%] truncate">{cardTitle}</div>
                        {/* <p className="h-[80%] text-wrap truncate w-[95%] max-h-[75%]">{cardDesc}</p> */}
                    </div>
                </>
            }

            {layoutIndex == "3" &&
                <>
                    <div className="text-center text-wrap w-[90%] mt-2 mb-5 absolute top-3" style={{ boxShadow: "3px 0px 3px 1px rgba(84,84,84,0.85), 0px 3px 3px 1px rgba(84,84,84,0.85), -3px 0px 3px 1px rgba(252,252,252,0.85), 0px -3px 3px 1px rgba(252,252,252,0.85)", borderRadius: "3px" }}>
                        <div className="text-2xl font-bold truncate pb-1">{cardTitle}</div>
                    </div>
                    <RenderCardImageAbsolute wid={250} hei={250} mb="16px" topPos="75px" />
                    <div className="w-[90%] max-h-[126px] absolute top-[345px] p-[3px] bg-opacity-45 bg-white" style={{ outlineStyle: descBorderSize > 0 ? `solid` : "none", outlineWidth: `${descBorderSize}px` }}>
                        <p className="h-[100%] max-h-[126px] text-wrap truncate w-[100%]">{cardDesc}</p>
                    </div>
                </>
            }


            {layoutIndex == "4" &&
                <>
                    <div className="text-center text-wrap w-[90%] mt-2 mb-5 absolute top-[15px]" style={{ boxShadow: "3px 0px 3px 1px rgba(84,84,84,0.85), 0px 3px 3px 1px rgba(84,84,84,0.85), -3px 0px 3px 1px rgba(252,252,252,0.85), 0px -3px 3px 1px rgba(252,252,252,0.85)", borderRadius: "3px" }}>
                        <div style={{ fontWeight: cardTitleWeight, color: titleColor }} className="text-2xl font-bold truncate pb-1">{cardTitle}</div>
                    </div>
                    <div className="w-[250px] max-h-[126px] absolute top-[60px] p-[3px] text-end" style={{ fontWeight: "bold" }}>
                        <p className="h-[100%] max-h-[126px] text-wrap truncate w-[100%]">{cardType}</p>
                    </div>
                    <RenderCardImageAbsolute wid={250} hei={250} mb="16px" topPos="95px" />
                    <div className="w-[90%] max-h-[100px] absolute top-[360px] p-[3px] bg-opacity-45 bg-white" style={{ outlineStyle: descBorderSize > 0 ? `solid` : "none", outlineWidth: `${descBorderSize}px` }}>
                        <p className="h-[100%] max-h-[100px] text-wrap truncate w-[100%]" style={{ color: descColor }}>{cardDesc}</p>
                    </div>
                </>
            }


            {(layoutIndex == "custom1" || layoutIndex == "custom2") &&
                // CustomLayout(layoutIndex, customData, selectedText)
                <>

                    {layoutIndex == "custom1" &&
                        <RenderCardImageAbsolute wid={300} hei={300} mb="16px" topPos="50px" />}
                    {layoutIndex == "custom2" &&
                        <div className="absolute">
                            <RenderCardImage wid={357} hei={488} mb="0" />
                        </div>}


                    {Object.keys(customData).map((x, i) => (
                        <div
                            key={i}
                            className={`absolute w-max text-center target-${x} min-h-8`} style={{ zIndex: x == selectedText ? 20 : 10, fontSize: `${customData[x].size}px`, color: customData[x].color.includes("gradient") ? "transparent" : customData[x].color, backgroundImage: customData[x].color.includes("gradient") ? customData[x].color : "none", backgroundClip: customData[x].color.includes("gradient") ? "text" : "none", fontWeight: customData[x].weight }}>
                            {customData[x].text}
                        </div>
                    ))}

                    <Moveable
                        snappable={true}
                        target={document.querySelector(`.target-${selectedText}`)}

                        bounds={{ top: 0, left: 0, bottom: 0, right: 0, position: "css" }}
                        origin={true}
                        edgeDraggable={false}
                        edge={true}
                        draggable={true}
                        throttleDrag={0}
                        onDrag={({
                            target, transform,
                        }) => {
                            if (centerLocked)
                                target.style.transform = `translate(0px${transform.slice(transform.indexOf(","))}`;
                            else
                                target.style.transform = transform;
                        }}
                        keepRatio={false}
                        scalable={true}
                        throttleScale={0}
                        onScale={({
                            target, transform,
                        }) => {
                            target.style.transform = transform;
                        }}
                        rotatable={true}
                        throttleRotate={5}
                        onRotate={({
                            target, transform,
                        }) => {
                            target.style.transform = transform;
                        }} />

                </>
            }
        </>
    )
}
