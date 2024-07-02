'use client'

import React, { useCallback, useRef, useState } from "react";
import useEyeDropper from 'use-eye-dropper'
import { HexColorPicker, HexColorInput } from "react-colorful";
import useClickOutside from "./useClickOutside";


export function ColorPicker({ color, setColor }) {
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
                style={{ backgroundColor: color }}
                onClick={() => toggle(true)}
            />

            {isOpen && (
                <div className="popover" ref={popover}>
                    <div className="test flex flex-col w-min">
                        <HexColorPicker color={color} onChange={setColor} />
                        <div className='flex flex-row justify-around z-10 bg-slate-500'>

                            <input maxLength={6} className='w-1/2 text-center focus:bg-slate-400 hover:bg-slate-400 bg-slate-500 focus:outline-none' value={color} onChange={x => setColor(x.target.value)} />
                            <div className='hover:bg-slate-400 w-1/2 p-1' onClick={pickColor}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="23"
                                    height="23"
                                    fill="#000000"
                                    class="bi bi-google"
                                    viewBox="0 0 57.141 57.141"
                                    className="m-auto"
                                >
                                    <path d="M55.27,10.402c2.243-2.245,2.497-5.845,0.578-8.196c-1.071-1.312-2.656-2.113-4.349-2.199
		c-1.688-0.081-3.355,0.55-4.549,1.743l-5.295,5.296c-1.119,1.119-3.069,1.119-4.187,0l-0.583-0.583
		c-0.864-0.862-2.271-0.861-3.135,0.001l-3.936,3.937c-0.863,0.863-0.864,2.27,0,3.135l1.968,1.968L10.684,36.605
		c-1.562,1.562-2.727,3.501-3.395,5.688c-0.549,1.796-1.541,3.448-2.871,4.779l-4.413,4.413l5.656,5.656l4.375-4.374
		c1.352-1.353,3.035-2.354,4.87-2.898c2.151-0.64,4.127-1.815,5.715-3.402l21.063-21.063l1.968,1.968
		c0.419,0.419,0.976,0.649,1.568,0.649c0.592,0,1.148-0.23,1.567-0.649l3.936-3.936c0.419-0.419,0.65-0.977,0.649-1.569
		c0-0.592-0.231-1.148-0.649-1.565l-0.582-0.582c-1.153-1.154-1.153-3.032,0-4.187L55.27,10.402z M19.207,45.052
		c-1.353,1.352-3.037,2.354-4.87,2.898c-2.152,0.639-4.129,1.815-5.715,3.402l-2.961,2.96l-2.828-2.828l2.999-2.999
		c1.561-1.562,2.726-3.502,3.394-5.688c0.549-1.796,1.542-3.449,2.872-4.779l21.101-21.102l7.071,7.071L19.207,45.052z
		 M48.727,21.132l0.583,0.583c0.052,0.052,0.063,0.111,0.063,0.152c0,0.04-0.011,0.101-0.063,0.153l-3.936,3.936
		c-0.082,0.084-0.222,0.085-0.308,0l-1.968-1.968l-9.899-9.899l-1.967-1.967c-0.085-0.085-0.085-0.223-0.001-0.308l3.935-3.936
		c0.043-0.043,0.099-0.064,0.155-0.064c0.056,0,0.111,0.021,0.153,0.063l0.582,0.582c0.937,0.937,2.182,1.453,3.507,1.453
		s2.571-0.516,3.508-1.453l5.295-5.296c0.795-0.794,1.888-1.22,3.034-1.159c1.146,0.058,2.175,0.578,2.9,1.467
		c1.278,1.565,1.083,3.989-0.443,5.517l-5.13,5.129C46.794,16.051,46.794,19.198,48.727,21.132z"/>
                                    <path d="M30.439,22.292l-9.899,9.899c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293
		s0.512-0.098,0.707-0.293l9.899-9.899c0.391-0.391,0.391-1.023,0-1.414S30.83,21.901,30.439,22.292z"/>
                                    <circle cx="18.146" cy="35.999" r="1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
