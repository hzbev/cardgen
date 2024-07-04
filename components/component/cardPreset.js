
import { RenderCardImage } from "./renderCardImage"

export function CardPreset({ uploadedImage, photoBorder, name, desc, index }) {
    return (
        <>
            {index == "1" &&
                <>
                    <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={300} hei={300} mb="16px" />
                    <div className="text-center text-wrap w-[87%] h-[28%]">
                        <div className="text-2xl font-bold h-8 truncate">{name}</div>
                        <p className="h-[80%] text-wrap truncate w-[95%] max-h-[75%]">{desc}</p>
                    </div>
                </>
            }

            {index == "2" &&
                <>
                    <RenderCardImage image={uploadedImage} showBorder={photoBorder} wid={350} hei={480} mb="0" />
                    <div className="text-center text-wrap w-[87%] absolute z-30 mt-[450px]">
                        <div className="text-2xl font-bold h-[100%] truncate">{name}</div>
                        {/* <p className="h-[80%] text-wrap truncate w-[95%] max-h-[75%]">{desc}</p> */}
                    </div>
                </>
            }
        </>
    )
}