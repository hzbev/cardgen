"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { ColorPickerr } from "./colorPicker"
import { useState, useRef } from "react"
import { RenderCardImage } from "./renderCardImage"
import grad2svg from 'svg-gradient'
import { toPng, toJpeg, toBlob, toPixelData, toSvg, toCanvas } from 'html-to-image';



export function CardDesign() {
  let [name, setName] = useState("Title")
  let [desc, setDesc] = useState("Here goes your description")
  let [file, setFile] = useState("/placeholder.svg");
  let [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)")
  let [borderColor, setBorderColor] = useState("#f0f0f0")
  let [tmpBorder, tmpsetBorderColor] = useState("#f0f0f0")
  let [photoBorder, setPhotoBored] = useState(true)



  const handleBorderColor = (x) => {
    if (!x.includes("gradient")) tmpsetBorderColor({})
    setBorderColor(x)
    if (x.includes("gradient")) tmpsetBorderColor(parseLinearGradient(grad2svg(x)))
  }



  const handleDownloadImage = async () => {
    toPng(document.getElementById('print'), { quality: 100 })
      .then(function (toBlob) {

        fetch("/api/generateimage", {
          method: "POST",
          body: JSON.stringify({
            "borderColor": borderColor,
            "tmpBorder": tmpBorder,
            "imgBlob": toBlob
          }),
          redirect: "follow"
        }).then(response => response.blob())
          .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "image.png";
            link.click();
          });
      });
  };

  return (
    (<div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="h-full">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div id="print"
                style={{
                  backgroundColor: bgColor,
                  // backgroundImage: 'url("https://cdn.discordapp.com/attachments/831862551956422666/1257451520723783754/photo-ground-texture-pattern.jpg?ex=6684747c&is=668322fc&hm=8881a2c65e19d682886a165f657f9a573c07068d68912c27bff7c411e9e65cf8&")'

                }}
                className={`pt-4 pb-4 rounded-lg w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay`}>
                {
                  tmpBorder?.angle
                    ?
                    <svg className="absolute" width="357" height="488" viewBox="0 0 357 488" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0 480C0 484.418 3.58172 488 8 488H349C353.418 488 357 484.418 357 480V7.99999C357 3.58171 353.418 0 349 0H8C3.58172 0 0 3.58172 0 8V480ZM349 472C349 476.418 345.418 480 341 480H16C11.5817 480 8 476.418 8 472V459.989C8 459.719 8.21873 459.5 8.48854 459.5V459.5C13.5135 459.5 17.7708 457.533 17.7708 450.884V377.649C17.7708 371 13.5135 369.033 8.48854 369.033V369.033C8.21873 369.033 8 368.815 8 368.545V16C8 11.5817 11.5817 8 16 8H341C345.418 8 349 11.5817 349 16V367.561C349 367.831 348.781 368.05 348.511 368.05V368.05C343.486 368.05 339.229 370.017 339.229 376.666V449.901C339.229 456.55 343.486 458.517 348.511 458.517V458.517C348.781 458.517 349 458.735 349 459.005V472Z"
                        fill="url(#g1)" />
                      <defs>
                        {/* {parse(toReact(cssGradient2SVG(borderColor)).join("\n"))} */}
                        <linearGradient id="g1" x1={tmpBorder.x1} y1={tmpBorder.y1} x2={tmpBorder.x2} y2={tmpBorder.y2}>
                          {tmpBorder.stops.map((x) => <stop key={`${x.offset}x`} offset={x.offset} stop-color={x.color} />)}
                        </linearGradient>
                      </defs>
                    </svg>
                    :
                    <svg className="absolute" width="357" height="488" viewBox="0 0 357 488" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M349 487H8C4.13401 487 1 483.866 1 480V8C1 4.13401 4.13401 1 8 1H349C352.866 1 356 4.134 356 7.99999V480C356 483.866 352.866 487 349 487ZM16 481H341C345.971 481 350 476.971 350 472V459.005C350 458.183 349.334 457.517 348.511 457.517C346.102 457.517 344.043 457.041 342.602 455.914C341.208 454.825 340.229 452.996 340.229 449.901V376.666C340.229 373.57 341.208 371.742 342.602 370.652C344.043 369.526 346.102 369.05 348.511 369.05C349.334 369.05 350 368.384 350 367.561V16C350 11.0294 345.971 7 341 7H16C11.0294 7 7 11.0294 7 16V368.545C7 369.367 7.66646 370.033 8.48854 370.033C10.8979 370.033 12.9573 370.509 14.3982 371.636C15.7923 372.725 16.7708 374.554 16.7708 377.649V450.884C16.7708 453.98 15.7923 455.808 14.3982 456.898C12.9573 458.024 10.8979 458.5 8.48854 458.5C7.66644 458.5 7 459.166 7 459.989V472C7 476.971 11.0294 481 16 481Z" fill={borderColor} stroke="black" stroke-width="2" />
                    </svg>
                }


                <RenderCardImage image={file} showBorder={photoBorder} />
                <div className="text-center text-wrap w-[87%] h-[28%]">
                  <div className="text-2xl font-bold h-8 truncate">{name}</div>
                  <p className="h-[80%] text-wrap truncate w-[95%] max-h-[75%]">{desc}</p>
                </div>
                {/* </div> */}
              </div>
            </CardContent>

          </Card>
        </div >
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Customize Your Card</CardTitle>
              <CardDescription>Upload an image, select a background, and add text</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="image">Card Image</Label>
                <div className="flex items-center gap-2">
                  <Input id="image" type="file" onChange={e => setFile(URL.createObjectURL(e.target.files[0]))} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="background">Card Background</Label>
                <ColorPickerr color={bgColor} setColor={setBgColor} hideButtons={true} />
                <Label htmlFor="background">Card Border</Label>
                <ColorPickerr color={borderColor} setColor={handleBorderColor} />
                <Button onClick={() => setPhotoBored(!photoBorder)} className="justify-self-start w-[45%] rounded-sm ">{photoBorder ? "Disable" : "Enable"} Photo Border</Button>

                {/* <RadioGroup id="background" defaultValue="classic">
                  <div className="flex items-center gap-4">
                    <Label
                      htmlFor="background-classic"
                      className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem id="background-classic" value="classic" className="w-5 h-5" />
                      Classic
                    </Label>
                    <Label
                      htmlFor="background-foil"
                      className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem id="background-foil" value="foil" className="w-5 h-5" />
                      Foil
                    </Label>
                    <Label
                      htmlFor="background-holographic"
                      className="flex items-center gap-2 cursor-pointer">
                      <RadioGroupItem id="background-holographic" value="holographic" className="w-5 h-5" />
                      Holographic
                    </Label>
                  </div>
                </RadioGroup> */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Card Title</Label>
                <Input maxLength={25} id="title" type="text" placeholder="Enter card title"
                  onInput={x => setName(x.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Card Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter card description"
                  className="min-h-[100px]"
                  onChange={e => setDesc(e.target.value)}
                />
              </div>
              {/* <div className="grid gap-4 sm:grid-cols-3">
                <div className="grid gap-2">
                  <Label htmlFor="hp">HP</Label>
                  <Input id="hp" type="number" placeholder="Enter HP" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="attack">Attack</Label>
                  <Input id="attack" type="number" placeholder="Enter Attack" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="defense">Defense</Label>
                  <Input id="defense" type="number" placeholder="Enter Defense" />
                </div>
              </div> */}
              <Button onClick={handleDownloadImage} className="justify-self-end">Save Card</Button>
            </CardContent>
          </Card>
        </div>
      </div >
    </div >)
  );
}



function toReact(orig) {
  let tmp = orig.split(/(?=<)/)
  tmp[0] = [tmp[0].slice(0, 16), 'id="g1" ', tmp[0].slice(16)].join('')

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
    if (tmp[i].includes("/>")) tmp[i] = tmp[i].replace("/>", "/></stop>")
  }

  tmp[1] = tmp[1]?.replace(/\s*offset="(\d+)%"/g, (match, p1) => {
    if (parseInt(p1, 10) < 10) {
      return '';
    }
    return match; // Keep the offset attribute
  });

  console.log(tmp)

  return tmp
}

function parseLinearGradient(svgString) {
  // Use regex to extract the attributes and stops
  const gradientRegex = /<linearGradient[^>]+>/;
  const stopRegex = /<stop[^>]+>/g;

  // Extract the linearGradient tag
  const linearGradientMatch = svgString.match(gradientRegex);
  if (!linearGradientMatch) return null;

  const linearGradientTag = linearGradientMatch[0];

  // Extract attributes from the linearGradient tag
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

  // Extract all stop tags
  const stopMatches = svgString.match(stopRegex);
  if (stopMatches) {
    stopMatches.forEach(stopTag => {
      const offsetMatch = stopTag.match(/offset="([^"]+)"/);
      const styleMatch = stopTag.match(/style="([^"]+)"/);
      const colorMatch = styleMatch ? styleMatch[1].match(/stop-color:\s*([^;]+);?/) : null;

      gradientData.stops.push({
        offset: offsetMatch ? offsetMatch[1] : null,
        color: colorMatch ? colorMatch[1] : null
      });
    });
  }

  return gradientData;
}