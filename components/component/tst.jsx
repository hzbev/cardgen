"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import * as html2canvas from 'html2canvas'
import domtoimage from 'dom-to-image';
import { extractColors } from 'extract-colors'

import { useState } from "react"

export function CardDesign() {
  let [name, setName] = useState("Title")
  let [desc, setDesc] = useState("Here goes your description")
  let [file, setFile] = useState("/placeholder.svg");
  let [bgColor, setBgColor] = useState("#f0f0f0")


  const handleDownloadImage = async () => {
    domtoimage.toPng(document.getElementById('print'), { quality: 100 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
        document.body.removeChild(link);
      });





    let colors = await extractColors(file)
    console.log(colors[0])
    let imgR = colors[0].red - 15 > 0 ? colors[0].red - 15 : 0
    let imgG = colors[0].green - 15 > 0 ? colors[0].green - 15 : 0
    let imgB = colors[0].blue - 15 > 0 ? colors[0].blue - 15 : 0
    setBgColor(rgbToHex(imgR, imgG, imgB))

  };

  return (
    (<div className="">
                        <img
                    src="https://cdn.discordapp.com/attachments/831862551956422666/1257712958956503070/how-to-draw-pikachu.png?ex=668567f8&is=66841678&hm=de960ff26e0c9caa2bf11eebcb6607f68ca871b766a758de48bfc0985b56a550&"
                    alt="Card Image"
                    width="100%"
                    height={250}
                    className="mb-4 object-cover outline " />
    </div>)
  );
}

function BoltIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <circle cx="12" cy="12" r="4" />
    </svg>)
  );
}


function HeartIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>)
  );
}


function ShieldIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>)
  );
}


function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
