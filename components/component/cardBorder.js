import { useAppStore } from "@/helper/globalState";
import { useRef, useEffect, useState } from "react";
import grad2svg from 'svg-gradient'


export function CardBorder() {
  let index = useAppStore((state) => state.borderIndex)
  let borderColor = useAppStore((state) => state.borderColor)
  let [gradientData, setGradient] = useState({});
  let enableImageMoving = useAppStore((state) => state.enableImageMoving)
 
  useEffect(() => {
    if (borderColor.includes("gradient")) setGradient(parseLinearGradient(grad2svg(borderColor)))
    else setGradient({})
}, [borderColor]);


  return (
    <svg className="absolute" style={{ zIndex: enableImageMoving ? 10 : 0 }} width="357" height="488" viewBox="0 0 357 488" fill="none" xmlns="http://www.w3.org/2000/svg">
      {index === "1" &&
        <>
          {borderColor.includes("gradient")
            ?
            <>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 480C0 484.418 3.58172 488 8 488H349C353.418 488 357 484.418 357 480V7.99999C357 3.58171 353.418 0 349 0H8C3.58172 0 0 3.58172 0 8V480ZM349 472C349 476.418 345.418 480 341 480H16C11.5817 480 8 476.418 8 472V459.989C8 459.719 8.21873 459.5 8.48854 459.5V459.5C13.5135 459.5 17.7708 457.533 17.7708 450.884V377.649C17.7708 371 13.5135 369.033 8.48854 369.033V369.033C8.21873 369.033 8 368.815 8 368.545V16C8 11.5817 11.5817 8 16 8H341C345.418 8 349 11.5817 349 16V367.561C349 367.831 348.781 368.05 348.511 368.05V368.05C343.486 368.05 339.229 370.017 339.229 376.666V449.901C339.229 456.55 343.486 458.517 348.511 458.517V458.517C348.781 458.517 349 458.735 349 459.005V472Z"
                fill="url(#g1)" />
              <defs>
                <linearGradient id="g1" x1={gradientData?.x1} y1={gradientData?.y1} x2={gradientData?.x2} y2={gradientData?.y2}>
                  {gradientData?.stops?.map((x) => <stop key={`${x.offset}x`} offset={x.offset} stop-color={x.color} />)}
                </linearGradient>
              </defs>
            </>
            :
            <path fill-rule="evenodd" clip-rule="evenodd" d="M349 487H8C4.13401 487 1 483.866 1 480V8C1 4.13401 4.13401 1 8 1H349C352.866 1 356 4.134 356 7.99999V480C356 483.866 352.866 487 349 487ZM16 481H341C345.971 481 350 476.971 350 472V459.005C350 458.183 349.334 457.517 348.511 457.517C346.102 457.517 344.043 457.041 342.602 455.914C341.208 454.825 340.229 452.996 340.229 449.901V376.666C340.229 373.57 341.208 371.742 342.602 370.652C344.043 369.526 346.102 369.05 348.511 369.05C349.334 369.05 350 368.384 350 367.561V16C350 11.0294 345.971 7 341 7H16C11.0294 7 7 11.0294 7 16V368.545C7 369.367 7.66646 370.033 8.48854 370.033C10.8979 370.033 12.9573 370.509 14.3982 371.636C15.7923 372.725 16.7708 374.554 16.7708 377.649V450.884C16.7708 453.98 15.7923 455.808 14.3982 456.898C12.9573 458.024 10.8979 458.5 8.48854 458.5C7.66644 458.5 7 459.166 7 459.989V472C7 476.971 11.0294 481 16 481Z" fill={borderColor} stroke="black" stroke-width="2" />
          }
        </>
      }


      {index === "2" &&
        <>
          {borderColor.includes("gradient")
            ?
            <>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 488H357V0H0V488ZM8 8H349V480H301.5L275.5 454H81.5L55.5 480H8V8Z"
                fill="url(#g1)" />
              <defs>
                <linearGradient id="g1" x1={gradientData?.x1} y1={gradientData?.y1} x2={gradientData?.x2} y2={gradientData?.y2}>
                  {gradientData?.stops?.map((x) => <stop key={`${x.offset}x`} offset={x.offset} stop-color={x.color} />)}
                </linearGradient>
              </defs>
            </>
            :
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 480V481H8H55.5H55.9142L56.2071 480.707L81.9142 455H275.086L300.793 480.707L301.086 481H301.5H349H350V480V8V7H349H8H7V8V480ZM356 1V487H1V1H356Z" fill={borderColor} stroke="black" stroke-width="2" />
          }
        </>
      }

      {index === "3" &&
        <>
          {borderColor.includes("gradient")
            ?
            <>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M0 488H357V0H0V488ZM8 8H349V480H8V8Z"
                fill="url(#g1)" />
              <defs>
                <linearGradient id="g1" x1={gradientData?.x1} y1={gradientData?.y1} x2={gradientData?.x2} y2={gradientData?.y2}>
                  {gradientData?.stops?.map((x) => <stop key={`${x.offset}x`} offset={x.offset} stop-color={x.color} />)}
                </linearGradient>
              </defs>
            </>
            :
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 488H357V0H0V488ZM8 8H349V480H8V8Z" fill={borderColor} />
          }
        </>
      }
    </svg>


  );
}

function parseLinearGradient(svgString) {
  const gradientRegex = /<linearGradient[^>]+>/;
  const stopRegex = /<stop[^>]+>/g;
  const linearGradientMatch = svgString.match(gradientRegex);
  if (!linearGradientMatch) return null;
  const linearGradientTag = linearGradientMatch[0];
  const angleMatch = linearGradientTag.match(/data-gradient-angle="([^"]+)"/);
  const x1Match = linearGradientTag.match(/x1="([^"]+)"/);
  const y1Match = linearGradientTag.match(/y1="([^"]+)"/);
  const x2Match = linearGradientTag.match(/x2="([^"]+)"/);
  const y2Match = linearGradientTag.match(/y2="([^"]+)"/);

  const gradientData = {
    angle: true,
    x1: x1Match ? x1Match[1] : null,
    y1: y1Match ? y1Match[1] : null,
    x2: x2Match ? x2Match[1] : null,
    y2: y2Match ? y2Match[1] : null,
    stops: []
  };

  const stopMatches = svgString.match(stopRegex);
  if (stopMatches) {
    stopMatches.forEach(stopTag => {
      const offsetMatch = stopTag.match(/offset="([^"]+)"/);
      const styleMatch = stopTag.match(/style="([^"]+)"/);
      const colorMatch = styleMatch ? styleMatch[1].match(/stop-color:\s*([^;]+);?/) : null;

      gradientData?.stops.push({
        offset: offsetMatch ? offsetMatch[1] : null,
        color: colorMatch ? colorMatch[1] : null
      });
    });
  }

  return gradientData;
}