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
              <span id="print"
                style={{
                  backgroundColor: bgColor,
                  // backgroundImage: 'url("https://cdn.discordapp.com/attachments/831862551956422666/1257451520723783754/photo-ground-texture-pattern.jpg?ex=6684747c&is=668322fc&hm=8881a2c65e19d682886a165f657f9a573c07068d68912c27bff7c411e9e65cf8&")'

                }}
                className={`pt-6 pb-6 w-[357px] h-[488px] flex flex-col items-center justify-center bg-blend-overlay`}>
                <svg className="absolute" width="359" height="490" viewBox="0 0 359 490" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M358 489H1V1H358V489Z" stroke="black" stroke-width="2" />
                  <path
                    d="M350 481H9V460.5H9.48854C14.5135 460.5 18.7708 458.533 18.7708 451.884V378.649C18.7708 372 14.5135 370.033 9.48854 370.033H9V9H350V369.05H349.511C344.486 369.05 340.229 371.017 340.229 377.666V450.901C340.229 457.55 344.486 459.517 349.511 459.517H350V481Z"
                    stroke="black" stroke-width="2" />
                </svg>


                <RenderCardImage image={file} />
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2 h-8">{name}</div>
                  <p className="text-muted-foreground h-8">{desc}</p>
                </div>
                {/* </div> */}
              </span>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>)
  );
}


const Icon = ({ fill }) => {
  return (
    <svg>
      <symbol id="umbrella" viewBox="0 0 596 597">
        <title>Umbrella</title>
        <desc>Umbrella icon</desc>
        <path fill={fill} class="shaft" d="M260.4,335.7 L260.4,478 C260.4,543.1 313.4,596.1 378.5,596.1 C443.6,596.1 496.6,543.1 496.6,478 C496.6,457.5 479.9,440.8 459.4,440.8 C438.9,440.8 422.2,457.5 422.2,478 C422.2,502.2 402.7,521.7 378.5,521.7 C354.3,521.7 334.8,502.2 334.8,478 L334.8,335.7 L260.4,335.7 L260.4,335.7 Z"></path>
        <path class="fabric" d="M558,335.7 C578.5,335.7 595.2,319 595.2,298.5 L595.2,294.8 C593.4,132 460.4,0.9 297.6,0.9 L297.6,0.9 C133.9,0.9 0,134.8 0,298.5 C0,319 16.7,335.7 37.2,335.7 L558,335.7 L558,335.7 Z M77.2,261.3 C94.9,156.2 187,75.3 297.6,75.3 C408.2,75.3 500.4,156.2 518,261.3 L77.2,261.3 L77.2,261.3 Z"></path>
      </symbol>
    </svg>
  )
};

