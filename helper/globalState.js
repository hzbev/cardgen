import { create } from 'zustand'
import { produce } from 'immer'


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
    descBorderSize: 0,
    selectedTexture: "0",
    selectedBlendMode: "overlay",
    centerLocked: false,
    selectedText: "none",
    customData: {},


    changeTitle: (x) => set((state) => ({ title: x })),
    changeType: (x) => set((state) => ({ typeCard: x })),
    changeDesc: (x) => set((state) => ({ desc: x })),
    changeImage: (x) => set((state) => ({ imageData: x })),
    changeLayout: (x) => set((state) => ({ layoutIndex: x })),
    changeBorder: (x) => set((state) => ({ borderIndex: x })),
    changeBgColor: (x) => set((state) => ({ bgColor: x })),
    changeBorderColor: (x) => set((state) => ({ borderColor: x })),
    changeMovingImage: () => set((state) => ({ enableImageMoving: !state.enableImageMoving })),
    changePhotoBorderSize: (x) => set((state) => ({ photoBorderSize: x })),
    changDescBorderSize: (x) => set((state) => ({ descBorderSize: x })),


    changeSelectedTexture: (x) => set((state) => ({ selectedTexture: x })),
    changeSelectedBlendMode: (x) => set((state) => ({ selectedBlendMode: x })),

    changeCenterLocked: () => set((state) => ({ centerLocked: !state.centerLocked })),
    changeSelectedText: (x) => set((state) => ({ selectedText: x })),

    addCustomData: () => set(produce((state) => {
        state.customData[Object.keys(state.customData).length + 1] = { text: "example", color: "#000000", size: 25, rotation: "0", weight: "normal" }
    })),

    editCustomData: (key, value) => set(produce((state) => {
        state.customData[state.selectedText][key] = value
    }))










    //   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    //   removeAllBears: () => set({ bears: 0 }),
}))