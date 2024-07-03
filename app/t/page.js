"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useState } from "react"

import { RenderCardImage } from "../../components/component/renderCardImage"

export default function Heheheh() {

  let [name, setName] = useState("Title")
  let [desc, setDesc] = useState("Here goes your description")
  let [file, setFile] = useState("/placeholder.svg");
  let [bgColor, setBgColor] = useState("#f0f0f0")

  let image = "https://cdn.discordapp.com/attachments/831862551956422666/1257712958956503070/how-to-draw-pikachu.png?ex=668567f8&is=66841678&hm=de960ff26e0c9caa2bf11eebcb6607f68ca871b766a758de48bfc0985b56a550&"
  return (
    (<div className="max-w-4xl mx-auto p-6 sm:p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="h-full shadow-none border-none">
            <CardContent className="flex flex-col items-center justify-center h-full">
              <div
                id="print"
                style={{
                  backgroundColor: bgColor,
                  // backgroundImage: 'url("https://cdn.discordapp.com/attachments/831862551956422666/1257451520723783754/photo-ground-texture-pattern.jpg?ex=6684747c&is=668322fc&hm=8881a2c65e19d682886a165f657f9a573c07068d68912c27bff7c411e9e65cf8&")'
                  borderImageSource: "url('/border1.svg')",
                  borderWidth: "50px",
                  borderImageSlice: "50"
                }}
                className={`pt-6 pb-6 w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay`}>
                  <RenderCardImage image={file} />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2 h-8">{name}</div>
                  <p className="text-muted-foreground h-8">{desc}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>)
  );
}

