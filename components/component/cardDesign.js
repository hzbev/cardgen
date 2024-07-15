"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import * as Collapsible from '@radix-ui/react-collapsible';
import { useAppStore } from "@/helper/globalState"

import { Textarea } from "@/components/ui/textarea"
import { ColorPickerr } from "./colorPicker"
import { useState, useRef } from "react"
import { toPng } from 'html-to-image';
import { CardBorder } from "./cardBorder"
import { CardPreset } from "./cardPreset"


export function CardDesign() {
  let changeTitle = useAppStore((state) => state.changeTitle)
  let changeType = useAppStore((state) => state.changeType)
  let changeDesc = useAppStore((state) => state.changeDesc)
  let changeImage = useAppStore((state) => state.changeImage)
  let changLayoutIndex = useAppStore((state) => state.changeLayout)
  let changeBorderIndex = useAppStore((state) => state.changeBorder)
  let changeBgColor = useAppStore((state) => state.changeBgColor)
  let changeBorderColor = useAppStore((state) => state.changeBorderColor)
  let setMovingImage = useAppStore((state) => state.setMovingImage)
  let changePhotoBorderSize = useAppStore((state) => state.changePhotoBorderSize)
  let changeCenterLocked = useAppStore((state) => state.changeCenterLocked)

  // let changeSelectedTexture = useAppStore((state) => state.changeSelectedTexture)
  // let changeSelectedBlendMode = useAppStore((state) => state.changeSelectedBlendMode)




  let bgColor = useAppStore((state) => state.bgColor)
  let borderColor = useAppStore((state) => state.borderColor)
  let layoutIndex = useAppStore((state) => state.layoutIndex)
  let enableImageMoving = useAppStore((state) => state.enableImageMoving)
  let centerLocked = useAppStore((state) => state.centerLocked)


  let [selectedTexture, setSelectedTexture] = useState('0')
  let [selectedBlend, setSelectedBlend] = useState('overlay')



  let [titleWeight, setTitleWeight] = useState("normal") //later


  let [selectedText, setSelectedText] = useState("none")

  let [customTextObj, setCustomTextObj] = useState({})
  let [tmpselectedText, settmpSelectedText] = useState("")
  let [tmpselectedSize, settmpSelectedSize] = useState(25)
  let [tmpDescBorderSize, settmpDescBorderSize] = useState(0)
  let [tmpselectedColor, settmpSelectedColor] = useState("#000000")
  let [tmpselectedfontSize, settmpSelectedfontSize] = useState("normal")


  const handleNewTex = (x) => {
    setSelectedText(x)
    settmpSelectedText(customTextObj[x]?.text || "")
    settmpSelectedSize(customTextObj[x]?.size || 0)
    settmpSelectedColor(customTextObj[x]?.color || "#000000")
  }

  const handleNewFontWeight = (x) => {
    setSelectedText(x)
    tmpselectedfontSize(customTextObj[x]?.weight || "normal")
  }

  const editElementWeight = async (e) => {
    let tmpObj = { ...customTextObj }
    tmpObj[selectedText].weight = e
    setCustomTextObj(tmpObj)
    console.log(customTextObj)
    // settmpSelectedText(e.target.value)
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

  const addCustomText = async (e) => {
    let total = Object.keys(customTextObj).length
    let tmpObj = { ...customTextObj }
    tmpObj[total + 1] = { text: "example", color: "#000000", size: 25, rotation: "0", weight: "normal" }
    // setSelectedText(total+1)
    setCustomTextObj(tmpObj)
  }
  const addCustomText111 = async (e) => {
    console.log()
  }

  const editElementText = async (e) => {
    let tmpObj = { ...customTextObj }
    tmpObj[selectedText].text = e.target.value
    setCustomTextObj(tmpObj)
    settmpSelectedText(e.target.value)
  }

  const editElementSize = async (e) => {
    let tmpObj = { ...customTextObj }
    if (e.target.value > 100 || e.target.value < 1) return
    tmpObj[selectedText].size = e.target.value
    setCustomTextObj(tmpObj)
    settmpSelectedSize(e.target.value)
  }

  const editElementColor = async (e) => {
    let tmpObj = { ...customTextObj }
    tmpObj[selectedText].color = e
    setCustomTextObj(tmpObj)
    settmpSelectedColor(e)
  }



  return (
    (<div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="h-full">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div id="print"
                style={{
                  backgroundColor: bgColor,
                  backgroundImage: `url("/${selectedTexture}.jpg")`,
                  backgroundBlendMode: selectedBlend,
                  backgroundSize: "cover"
                }}
                className={`pt-4 pb-4 rounded-lg w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay relative z-5`}>
                <CardBorder />
                <CardPreset customText={customTextObj} activeText={selectedText} descPX={tmpDescBorderSize} />
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
                  <Input id="image" type="file" onChange={e => changeImage(URL.createObjectURL(e.target.files[0]))} />
                </div>
              </div>
              <div className="grid gap-2">

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="background">Background</Label>
                    <ColorPickerr id="background" color={bgColor} setColor={changeBgColor} hideButtons={true} />

                  </div>
                  <div>
                    <Label htmlFor="bgColor">Border</Label>
                    <ColorPickerr id="bgColor" color={borderColor} setColor={changeBorderColor} />
                  </div>
                  <div>
                    {/* <Button onClick={() => setPhotoBored(!photoBorder)} className="justify-self-start w-[90%] rounded-sm ">{photoBorder ? "Disable" : "Enable"} Photo Border</Button> */}
                  </div>
                  <div>
                    <Button onClick={setMovingImage} className="justify-self-start w-[90%] rounded-sm ">{enableImageMoving ? "Enable" : "Disable"} Moving Image </Button>

                  </div>

                  <div>
                    <Label htmlFor="style">Card Style</Label>
                    <Select defaultValue="1" onValueChange={changLayoutIndex}>
                      <SelectTrigger id="style" className="w-[160px]">
                        <SelectValue placeholder="Select Style" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>

                        <SelectItem value="custom1">Custom - Style 1</SelectItem>
                        <SelectItem value="custom2">Custom - Style 2</SelectItem>


                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="border">Border</Label>
                    <Select defaultValue="1" onValueChange={changeBorderIndex}>
                      <SelectTrigger id="border" className="w-[160px]">
                        <SelectValue placeholder="Select border" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>

                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="texture">Card Texture</Label>
                    <Select defaultValue="0" onValueChange={setSelectedTexture}>
                      <SelectTrigger id="texture" className="w-[160px]">
                        <SelectValue placeholder="Select Texture" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="0">None</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>


                  <div>
                    <Label htmlFor="textureMode">Texture Mode</Label>
                    <Select defaultValue="overlay" onValueChange={setSelectedBlend}>
                      <SelectTrigger id="textureMode" className="w-[160px]">
                        <SelectValue placeholder="Texture mode" />
                      </SelectTrigger>
                      <SelectContent >
                        {/* <SelectItem value="multiply">multiply</SelectItem> */}
                        <SelectItem value="screen">screen</SelectItem>
                        <SelectItem value="overlay">overlay</SelectItem>
                        <SelectItem value="darken">darken</SelectItem>
                        {/* <SelectItem value="lighten">lighten</SelectItem> */}
                        {/* <SelectItem value="color-dodge">color-dodge</SelectItem> */}
                        {/* <SelectItem value="color-burn">color-burn</SelectItem> */}
                        <SelectItem value="hard-light">hard-light</SelectItem>
                        <SelectItem value="soft-light">soft-light</SelectItem>
                        {/* <SelectItem value="difference">difference</SelectItem> */}
                        {/* <SelectItem value="exclusion">exclusion</SelectItem> */}
                        {/* <SelectItem value="hue">hue</SelectItem> */}
                        {/* <SelectItem value="saturation">saturation</SelectItem> */}
                        {/* <SelectItem value="color">color</SelectItem> */}
                        <SelectItem value="luminosity">luminosity</SelectItem>
                        {/* <SelectItem value="plus-darker">plus-darker</SelectItem> */}
                        {/* <SelectItem value="plus-lighter">plus-lighter</SelectItem> */}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="edit44">Photo Border Width</Label>
                    <Input maxLength={2} id="edit44" defaultValue="3" type="number" min="0" max="10"
                      onChange={(e) => e.target.value > 10 ? null : changePhotoBorderSize(e.target.value)} />
                  </div>

                  <div>
                    <Label htmlFor="edit444">Description Border Width</Label>
                    <Input maxLength={1} id="edit444" value={tmpDescBorderSize} type="number" min="0" max="5"
                      onChange={(e) => e.target.value > 5 ? null : settmpDescBorderSize(e.target.value)} />
                  </div>

                </div>


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
              {(layoutIndex !== "custom1" && layoutIndex !== "custom2") ?
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Card Title</Label>
                    <Input maxLength={25} id="title" type="text" placeholder="Enter card title"
                      onInput={x => changeTitle(x.target.value)} />
                  </div>
                  <Select onValueChange={setTitleWeight}>
                    <SelectTrigger id="selectedBold" className="w-[160px]">
                      <SelectValue placeholder="Normal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="900">Bolder</SelectItem>
                    </SelectContent>
                  </Select>
                  {layoutIndex == "3" &&
                    <div className="grid gap-2">
                      <Label htmlFor="type">Card Type</Label>
                      <Input maxLength={25} id="type" type="text" defaultValue="[ TRAP CARD ]" placeholder="Enter card type"
                        onInput={x => changeType(x.target.value)} />
                    </div>
                  }
                  <div className="grid gap-2">
                    <Label htmlFor="description">Card Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter card description"
                      className="min-h-[100px]"
                      onChange={e => changeDesc(e.target.value)}
                    />
                  </div>
                </>
                :
                <div className="grid gap-2">
                  <Button onClick={addCustomText} className="justify-self-start w-[45%] rounded-sm ">Add Draggable Text</Button>
                  <Button onClick={changeCenterLocked} className="justify-self-start w-[45%] rounded-sm ">{centerLocked ? "Unlock" : "Lock"} center</Button>

                  <Label htmlFor="addedText">Active Text Layer</Label>
                  <Select value={selectedText} onValueChange={(x) => handleNewTex(x)}>
                    <SelectTrigger id="addedText" className="w-[160px]">
                      <SelectValue placeholder="None" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <DropdownList customTextObj={customTextObj}></DropdownList>

                    </SelectContent>
                  </Select>
                  {
                    selectedText !== "none" &&
                    <>
                      <Label htmlFor="edit1">Layer {selectedText}&apos;s text</Label>
                      <Input maxLength={25} id="edit1" value={tmpselectedText} defaultValue="example" type="text" placeholder="Enter card title"
                        onChange={editElementText} />

                      <Label htmlFor="edit2">Layer {selectedText}&apos;s size</Label>
                      <Input maxLength={3} id="edit2" value={tmpselectedSize} type="number" min="25" max="100"
                        onChange={editElementSize} />

                      <ColorPickerr color={tmpselectedColor} setColor={editElementColor} hideButtons={false} />

                      <Select onValueChange={editElementWeight}>
                        <SelectTrigger id="selectedBold" className="w-[160px]">
                          <SelectValue placeholder="Normal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="bold">Bold</SelectItem>
                          <SelectItem value="900">Bolder</SelectItem>
                        </SelectContent>
                      </Select>

                    </>
                  }

                </div>
              }
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




const DropdownList = ({ customTextObj }) => (
  Object.keys(customTextObj).map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)
)


