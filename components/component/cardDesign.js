"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import domtoimage from 'dom-to-image';
import { ColorPickerr } from "./colorPicker"
import { useState } from "react"
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


  const handleBorderColor = (x) => {
    console.log("set ", x)
    if (!x.includes("gradient")) tmpsetBorderColor({})
    setBorderColor(x)

    tmpsetBorderColor(parseLinearGradient(grad2svg(x)))
    console.log("sesss ", tmpBorder)

  }



  const handleDownloadImage = async () => {
    toSvg(document.getElementById('print'), { quality: 100 })
      .then(function (dataUrl) {
        console.log(dataUrl)

      //   let svgg = tmpBorder?.angle
      //     ?
      //     <svg className="absolute" width="361" height="492" viewBox="-2 -2 363 494" fill="none" xmlns="http://www.w3.org/2000/svg">
      //       <path fill-rule="evenodd" clip-rule="evenodd"
      //         d="M0 488H357V0H0V488ZM349 480H8V459.5H8.48854C13.5135 459.5 17.7708 457.533 17.7708 450.884V377.649C17.7708 371 13.5135 369.033 8.48854 369.033H8V8H349V368.05H348.511C343.486 368.05 339.229 370.017 339.229 376.666V449.901C339.229 456.55 343.486 458.517 348.511 458.517H349V480Z"
      //         fill="url(#g1)" />
      //       <defs>
      //         {/* {parse(toReact(cssGradient2SVG(borderColor)).join("\n"))} */}
      //         <linearGradient id="g1" x1={tmpBorder.x1} y1={tmpBorder.y1} x2={tmpBorder.x2} y2={tmpBorder.y2}>
      //           {tmpBorder.stops.map((x) => <stop offset={x.offset} stop-color={x.color} />)}
      //         </linearGradient>
      //       </defs>
      //     </svg>
      //     :
      //     <svg className="absolute" width="361" height="492" viewBox="-2 -2 363 494" fill="none" xmlns="http://www.w3.org/2000/svg">
      //       <path fill-rule="evenodd" clip-rule="evenodd" d="M0 490H359V0H0V490ZM350.955 481.967H8.04482V461.383H8.53609C13.5892 461.383 17.8703 459.408 17.8703 452.732V379.197C17.8703 372.521 13.5892 370.546 8.53609 370.546H8.04482V8.03279H350.955V369.558H350.464C345.411 369.558 341.13 371.533 341.13 378.21V451.745C341.13 458.421 345.411 460.396 350.464 460.396H350.955V481.967Z" fill={borderColor} stroke="black" stroke-width="2" />
      //     </svg>

      //   let aaa = `       <svg className="absolute" width="361" height="492" viewBox="-2 -2 363 494" fill="none" xmlns="http://www.w3.org/2000/svg">
      //   <path fill-rule="evenodd" clip-rule="evenodd" d="M0 490H359V0H0V490ZM350.955 481.967H8.04482V461.383H8.53609C13.5892 461.383 17.8703 459.408 17.8703 452.732V379.197C17.8703 372.521 13.5892 370.546 8.53609 370.546H8.04482V8.03279H350.955V369.558H350.464C345.411 369.558 341.13 371.533 341.13 378.21V451.745C341.13 458.421 345.411 460.396 350.464 460.396H350.955V481.967Z" fill={${borderColor}} stroke="black" stroke-width="2" />
      // </svg>`

      //   const image = new Image();
      //   let tt = dataUrl.getContext("2d")
      //   image.src = `data:image/svg+xml;base64,${btoa(svgg)}`;
      //   tt.drawImage(image, 0, 0)
        document.body.appendChild(dataUrl);
      //   document.body.appendChild(image);

        // var link = document.createElement('a');
        // link.download = 'my-image-name.png';
        // link.href = dataUrl;
        // link.click();
        // // document.body.removeChild(link);/
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
                className={`pt-6 pb-6 w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay`}>
                {
                  tmpBorder?.angle
                    ?
                    <svg className="absolute" width="361" height="492" viewBox="-2 -2 363 494" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M0 488H357V0H0V488ZM349 480H8V459.5H8.48854C13.5135 459.5 17.7708 457.533 17.7708 450.884V377.649C17.7708 371 13.5135 369.033 8.48854 369.033H8V8H349V368.05H348.511C343.486 368.05 339.229 370.017 339.229 376.666V449.901C339.229 456.55 343.486 458.517 348.511 458.517H349V480Z"
                        fill="url(#g1)" />
                      <defs>
                        {/* {parse(toReact(cssGradient2SVG(borderColor)).join("\n"))} */}
                        <linearGradient id="g1" x1={tmpBorder.x1} y1={tmpBorder.y1} x2={tmpBorder.x2} y2={tmpBorder.y2}>
                          {tmpBorder.stops.map((x) => <stop offset={x.offset} stop-color={x.color} />)}
                        </linearGradient>
                      </defs>
                    </svg>
                    :
                    <svg className="absolute" width="361" height="492" viewBox="-2 -2 363 494" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 490H359V0H0V490ZM350.955 481.967H8.04482V461.383H8.53609C13.5892 461.383 17.8703 459.408 17.8703 452.732V379.197C17.8703 372.521 13.5892 370.546 8.53609 370.546H8.04482V8.03279H350.955V369.558H350.464C345.411 369.558 341.13 371.533 341.13 378.21V451.745C341.13 458.421 345.411 460.396 350.464 460.396H350.955V481.967Z" fill={borderColor} stroke="black" stroke-width="2" />
                    </svg>


                }



                <RenderCardImage image={file} />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2 h-8">{name}</div>
                  <p className="text-muted-foreground h-8">{desc}</p>
                </div>
                {/* </div> */}
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex items-center gap-2">
                <Label htmlFor="export-size">Export Size:</Label>
                <Select id="export-size">
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="300x420">300x420</SelectItem>
                    <SelectItem value="400x560">400x560</SelectItem>
                    <SelectItem value="500x700">500x700</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleDownloadImage}>Export</Button>
              </div>
            </CardFooter>
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
                <ColorPickerr color={bgColor} setColor={setBgColor} />
                <Label htmlFor="background">Card Border</Label>
                <ColorPickerr color={borderColor} setColor={handleBorderColor} />

                <RadioGroup id="background" defaultValue="classic">
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
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Card Title</Label>
                <Input id="title" type="text" placeholder="Enter card title"
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
              <div className="grid gap-4 sm:grid-cols-3">
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
              </div>
              <Button className="justify-self-end">Save Card</Button>
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