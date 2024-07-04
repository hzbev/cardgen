import { readFileSync, createReadStream } from "fs"
import { resolve } from 'path';
import { NextResponse, NextRequest } from 'next/server';
import sharp from "sharp"
import { parse, stringify } from 'svgson'



export async function POST(req, res) {
  const imagePath = resolve('./app/api/test/combined.png');
  const data = await req.json();
  // console.log(data);
  if (data.borderColor.includes("gradient")) {
    let orig = await parse(readFileSync("./public/border1-gradient.svg", "utf-8"))
    for (let i of orig.children) {
      if (i.name == "defs") {


        i.children[0].attributes.x1 = data.tmpBorder.x1
        i.children[0].attributes.x1 = data.tmpBorder.x1
        i.children[0].attributes.x2 = data.tmpBorder.x2
        i.children[0].attributes.y2 = data.tmpBorder.y2

        for (let k of data.tmpBorder.stops) {
          i.children[0].children.push(createObj("stop", {
            "offset": k.offset,
            "stop-color": k.color
          }))
        }

      }
    }


    try {
      const uri = data.imgBlob.split(';base64,').pop()
      let tmpData = await sharp(Buffer.from(uri, 'base64'))
        .composite([
          { input: Buffer.from(stringify(orig)) }
        ])
        .toBuffer()


      let sharpData = await sharp(tmpData)
        .withMetadata({ density: 150 })
        .resize(744, 1017)
        .sharpen({ sigma: .2 })
        .toBuffer()


      const response = new NextResponse(sharpData);

      response.headers.set('content-type', 'image/png');
      return response;

    } catch (error) {
      console.log(error)
    }
  }

  let orig = await parse(readFileSync("./public/border1.svg", "utf-8"))
  orig.children[0].attributes.fill = data.borderColor

  try {
    const uri = data.imgBlob.split(';base64,').pop()
    let tmpData = await sharp(Buffer.from(uri, 'base64'))
      .composite([
        { input: Buffer.from(stringify(orig)) }
      ])
      .toBuffer()


    let sharpData = await sharp(tmpData)
      .withMetadata({ density: 150 })
      .resize(744, 1017)
      .toBuffer()


    const response = new NextResponse(sharpData);

    response.headers.set('content-type', 'image/png');
    return response;

  } catch (error) {
    console.log(error)
  }

}

function createObj(name, attributes) {
  return {
    name,
    "type": "element",
    "value": "",
    "parent": null,
    attributes,
    "children": []
  }
}