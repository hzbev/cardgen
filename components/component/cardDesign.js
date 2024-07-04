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
import { CardBorder } from "./cardBorder"
import { CardPreset } from "./cardPreset"


export function CardDesign() {
  let [name, setName] = useState("Title")
  let [desc, setDesc] = useState("Here goes your description")
  let [file, setFile] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=");
  let [bgColor, setBgColor] = useState("rgba(255, 255, 255, 1)")
  let [borderColor, setBorderColor] = useState("#f0f0f0")
  let [tmpBorder, tmpsetBorderColor] = useState("#f0f0f0")
  let [photoBorder, setPhotoBored] = useState(true)
  let [overlayBehind, setOverlayBehind] = useState(true)
  let [borderIndex, setBorderIndex] = useState("1")
  let [presetIndex, setPresetIndex] = useState("1")






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
                className={`pt-4 pb-4 rounded-lg w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay relative`}>
                <CardBorder index={borderIndex} tmpBorder={tmpBorder} borderColor={borderColor} disableMoving={overlayBehind} />
                <CardPreset uploadedImage={file} photoBorder={photoBorder} name={name} desc={desc} index={presetIndex} />
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
                <Button onClick={() => setOverlayBehind(!overlayBehind)} className="justify-self-start w-[45%] rounded-sm ">{overlayBehind ? "Enable" : "Disable"} Moving Image </Button>
                
                <Label htmlFor="border">Card Style</Label>
                <Select onValueChange={setPresetIndex}>
                  <SelectTrigger id="border" className="w-[160px]">
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
                
                <Label htmlFor="border">Border</Label>
                <Select onValueChange={setBorderIndex}>
                  <SelectTrigger id="border" className="w-[160px]">
                    <SelectValue placeholder="Select border" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                  </SelectContent>
                </Select>
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