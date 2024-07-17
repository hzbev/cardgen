import { useState, useEffect } from "react";

function useFonts(fonts) {
  const [fontFaces] = useState(
    fonts.map((font) => {
      return new FontFace(font.family, `url(${font.url})`, font.options);
    })
  );

  async function loadFontFace(fontFace) {
    const loadedFont = await fontFace.load();
    document.fonts.add(loadedFont);
  }

  useEffect(() => {
    fontFaces.forEach((fontFace) => {
      loadFontFace(fontFace);
    });
  }, [fontFaces]);
}

export { useFonts };