import { create } from 'zustand'

export const useAppStore = create((set) => ({
    title: "Title",
    typeCard: "[ TRAP CARD ]",
    desc: "Here goes your description",
    imageData: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    layoutIndex: "1",
    borderIndex: "1",
    bgColor: "rgba(255, 255, 255, 1)",
    borderColor: "#f0f0f0",
    enableImageMoving: true,
    photoBorderSize: 3,

    selectedTexture: "0",
    selectedBlendMode: "overlay",

    centerLocked: false,
    selectedText: "none",


    changeTitle: (x) => set((state) => ({ title: x })),
    changeType: (x) => set((state) => ({ typeCard: x })),
    changeDesc: (x) => set((state) => ({ desc: x })),
    changeImage: (x) => set((state) => ({ imageData: x })),
    changeLayout: (x) => set((state) => ({ layoutIndex: x })),
    changeBorder: (x) => set((state) => ({ borderIndex: x })),
    changeBgColor: (x) => set((state) => ({ bgColor: x })),
    changeBorderColor: (x) => set((state) => ({ borderColor: x })),
    setMovingImage: () => set((state) => ({ enableImageMoving: !state.enableImageMoving })),
    changePhotoBorderSize: (x) => set((state) => ({ photoBorderSize: x })),

    changeSelectedTexture: (x) => set((state) => ({ selectedTexture: x })),
    changeSelectedBlendMode: (x) => set((state) => ({ selectedBlendMode: x })),

    changeCenterLocked: () => set((state) => ({ centerLocked: !state.centerLocked })),
    changeSelectedText: (x) => set((state) => ({ selectedText: x })),









    //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //   removeAllBears: () => set({ bears: 0 }),
}))