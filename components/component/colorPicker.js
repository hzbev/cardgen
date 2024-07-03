'use client'

import React, { useCallback, useRef, useState } from "react";
import useEyeDropper from 'use-eye-dropper'
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import { handleClientScriptLoad } from "next/script";

import cssGradient2SVG from 'gradient2svg'



export function ColorPickerr({ color, setColor }) {
// export function ColorPickerr() {
    // const [color, setColor] = useState('linear-gradient(90deg, rgba(96,93,93,1) 0%, rgba(255,255,255,1) 100%)');
    const { gradientType, setLinear, setRadial, addPoint, deletePoint, degrees, setDegrees, setPointLeft, currentLeft, selectedPoint } = useColorPicker(color, setColor);
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const { open, close, isSupported } = useEyeDropper()
    const [error, setError] = useState()
    const pickColor = useCallback(() => {
        // Using async/await (can be used as a promise as-well)
        const openPicker = async () => {
            try {
                const color = await open()
                setColor(color.sRGBHex)
            } catch (e) {
                console.log(e)
                // Ensures component is still mounted
                // before calling setState
                if (!e.canceled) setError(e)
            }
        }
        openPicker()
    }, [open])

    const closePop = useCallback(() => toggle(false), []);
    useClickOutside(popover, closePop);

 

    return (
        <div className="picker w-10 h-10">
            <div
                className="swatch w-10 h-10 border-2 border-black"
                style={{ backgroundColor: color.includes("gradient") ? null : color, backgroundImage: color.includes("gradient") ? color : null }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover " ref={popover}>
                    <div className="test flex flex-col w-min z-20 bg-slate-800">
                        {/* <button onClick={setLinear}>Linear</button> */}
                        {/* <button onClick={setRadial}>Radial</button> */}
                        {/* {gradientType === 'linear-gradient' && <input value={degrees} onChange={(e) => setDegrees(e.target.value)} />} */}
                        {/* <input value={currentLeft} onChange={(e) => setPointLeft(e.target.value)} /> */}
                        {/* <button onClick={() => addPoint(50)}>Add Color</button>
                        <button onClick={() => deletePoint(selectedPoint)}>Delete Color</button> */}
                        <ColorPicker className="z-30 bg-slate-800" value={color} onChange={setColor} hideOpacity={true} hideInputType={true} hideAdvancedSliders={true} hideColorGuide={true} />
                    </div>
                </div>
            )}
        </div>
    );
};



function toReact(orig) {
    let tmp = orig.split(/(?=<)/)
     tmp[0] = [tmp[0].slice(0, 16), 'id="g1" ', tmp[0].slice(16)].join('')
     tmp[1] = tmp[1].replace(/\s*offset="(\d+)%"/g, (match, p1) => {
         if (parseInt(p1, 10) < 10) {
             return '';
         }
         return match; // Keep the offset attribute
     });
     for (let i = 0; i < tmp.length; i++) {
         if (tmp[i].includes("<linearGradient")) continue;
         tmp[i] = tmp[i].replace(/style="([^"]*stop-color:\s*rgba\([^;]+\));?[^"]*"/g, (match, styleContent) => {
             const stopColorMatch = styleContent.match(/stop-color:\s*(rgba\([^;]+\))/);
             if (stopColorMatch) {
                 const stopColorValue = stopColorMatch[1];
                 return `stop-color="${stopColorValue}"`;
             }
             return match;
         })
         
     }
     console.log(tmp)
 }