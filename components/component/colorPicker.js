'use client'

import React, { useCallback, useRef, useState } from "react";
import useClickOutside from "./useClickOutside";
import ColorPicker, { useColorPicker } from 'react-best-gradient-color-picker'
import { useAppStore } from "@/helper/globalState";



export function ColorPickerr({ color, setColor, hideButtons }) {
    const { gradientType, setLinear, setRadial, addPoint, deletePoint, degrees, setDegrees, setPointLeft, currentLeft, selectedPoint } = useColorPicker(color, setColor);
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const closePop = useCallback(() => toggle(false), []);
    useClickOutside(popover, closePop);
    return (
        <div className="picker w-10 h-10">
            <div
                className="swatch w-10 h-10 border-2 border-black"
                style={{ backgroundColor: color?.includes("gradient") ? null : color, backgroundImage: color?.includes("gradient") ? color : null }}
                onClick={() => toggle(true)}
            />
            {isOpen && (
                <div className="popover text-black" ref={popover}>
                    <div className="absolute z-40 bg-slate-500 p-3">
                        <ColorPicker className="text-black z-50 " value={color} onChange={setColor} hideOpacity={true} hideInputType={true} hideAdvancedSliders={true} hideColorGuide={true} hideGradientType={true} hidePresets={true} hideColorTypeBtns={hideButtons} />
                    </div>
                </div>
            )}
        </div>
    );
};
