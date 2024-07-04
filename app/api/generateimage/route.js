import { readFileSync, createReadStream } from "fs"
import { resolve } from 'path';
import { NextResponse, NextRequest } from 'next/server';
import sharp from "sharp"
import { parse, stringify } from 'svgson'



export async function POST(req, res) {
  const data = await req.json();
  if (data.borderColor.includes("gradient")) {
    try {
      const uri = data.imgBlob.split(';base64,').pop()
      let tmpData = await sharp(Buffer.from(uri, 'base64'))
        .withMetadata({ density: 150 })
        .resize(744, 1017)
        .sharpen({ sigma: .5 })
        .toBuffer()


      const response = new NextResponse(tmpData);

      response.headers.set('content-type', 'image/png');
      return response;

    } catch (error) {
      console.log(error)
    }
  }


  try {
    const uri = data.imgBlob.split(';base64,').pop()
    let tmpData = await sharp(Buffer.from(uri, 'base64'))
      .withMetadata({ density: 150 })
      .resize(744, 1017)
      .toBuffer()

    const response = new NextResponse(tmpData);

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