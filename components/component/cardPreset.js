
import { RenderCardImage, RenderCardImageAbsolute } from "./renderCardImage"
import Draggable from 'react-draggable'; // The default
import Moveable from "react-moveable";
import { useRef, useEffect } from "react";


export function CardPreset({ uploadedImage, photoBorder, name, desc, index, customText, activeText, disableMoving, borderPX, descPX, lockCenter }) {
    const itemsRef = useRef([]);
    const movableRef = useRef();

    // you can access the elements with itemsRef.current[n]
    useEffect(() => {
        // console.log(movableRef.current.request("draggable", { x: 0, y:0 }, true))
        console.log(movableRef.current)
        //    itemsRef.current = itemsRef.current.slice(0, activeText);
        console.log(itemsRef.current[0])
    }, [activeText]);
    return (
        <>
            {index == "1" &&
                <>
                    <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={300} hei={300} mb="16px" borderPX={borderPX} />
                    <div className="text-center text-wrap w-[90%] h-[28%]">
                        <div className="text-2xl font-bold h-8 truncate">{name}</div>
                        <p className="h-[80%] text-wrap truncate max-h-[75%]" style={{ outlineStyle: descPX > 0 ? `solid` : "none", outlineWidth: `${descPX}px` }}>{desc}</p>
                    </div>
                </>
            }

            {index == "2" &&
                <>
                    <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={350} hei={480} mb="0" borderPX={borderPX} />
                    <div className="text-center text-wrap w-[90%] absolute z-30 mt-[450px]">
                        <div className="text-2xl font-bold h-[100%] truncate">{name}</div>
                        {/* <p className="h-[80%] text-wrap truncate w-[95%] max-h-[75%]">{desc}</p> */}
                    </div>
                </>
            }

            {index == "3" &&
                <>
                    <div className="text-center text-wrap w-[90%] mt-2 mb-5 absolute top-3" style={{ boxShadow: "3px 0px 3px 1px rgba(84,84,84,0.85), 0px 3px 3px 1px rgba(84,84,84,0.85), -3px 0px 3px 1px rgba(252,252,252,0.85), 0px -3px 3px 1px rgba(252,252,252,0.85)", borderRadius: "3px" }}>
                        <div className="text-2xl font-bold truncate pb-1">{name}</div>
                    </div>
                    <RenderCardImageAbsolute image={uploadedImage} showBorder={photoBorder} wid={250} hei={250} mb="16px" topPos="75px" borderPX={borderPX} />
                    <div className="w-[90%] max-h-[126px] absolute top-[345px] p-[3px] bg-opacity-45 bg-white" style={{ outlineStyle: descPX > 0 ? `solid` : "none", outlineWidth: `${descPX}px` }}>
                        <p className="h-[100%] max-h-[126px] text-wrap truncate w-[100%]">{desc}</p>
                    </div>
                </>
            }

            {(index == "custom1" || index == "custom2") &&
                <>

                    {index == "custom1" &&
                        <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={300} hei={300} mb="0" borderPX={borderPX} />
                    }
                    {index == "custom2" &&
                        <div className="absolute">
                            <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={350} hei={480} mb="0" borderPX={borderPX} />

                        </div>

                    }


                    {Object.keys(customText).map((x, i) => (
                        <div
                            ref={el => itemsRef.current[i] = el}
                            key={i}
                            className={`w-max text-center target-${x} min-h-8`} style={{ zIndex: x == activeText ? 20 : 10, fontSize: `${customText[x].size}px`, color: customText[x].color.includes("gradient") ? "transparent" : customText[x].color, backgroundImage: customText[x].color.includes("gradient") ? customText[x].color : "none", backgroundClip: customText[x].color.includes("gradient") ? "text" : "none", fontWeight: customText[x].weight }}>
                            {customText[x].text}
                        </div>
                    ))}

                    <Moveable
                        // className="w-full h-full"
                        ref={movableRef}
                        snappable={true}
                        target={itemsRef.current[activeText - 1]}
                        // container={document.querySelector(`#print`)}
                        bounds={{ top: 0, left: 0, bottom: 0, right: 0, position: "css" }}
                        origin={true}
                        edgeDraggable={false}

                        /* Resize event edges */
                        edge={true}

                        /* draggable */
                        draggable={true}
                        throttleDrag={0}

                        onDrag={({
                            target,
                            beforeDelta, beforeDist,
                            left, top,
                            right, bottom,
                            delta, dist,
                            transform,
                            clientX, clientY,
                        }) => {
                            if (lockCenter) target.style.transform = `translate(0px${transform.slice(transform.indexOf(","))}`;
                            else target.style.transform = transform;
                        }}
                        keepRatio={false}



                        /* scalable */
                        /* Only one of resizable, scalable, warpable can be used. */
                        scalable={true}
                        throttleScale={0}

                        onScale={({
                            target, scale, dist, delta, transform,
                            clientX, clientY,
                        }) => {
                            target.style.transform = transform;
                        }}

                        /* rotatable */
                        rotatable={true}

                        throttleRotate={5}
                        onRotate={({
                            target,
                            delta, dist,
                            transform,
                            clientX, clientY,
                        }) => {
                            target.style.transform = transform;
                        }}

                    />

                </>
            }
        </>
    )
}