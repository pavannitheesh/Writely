"use client";

import {create } from "zustand";

interface CoverImageStoreProps{
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void;
}
export const useCoverImage = create<CoverImageStoreProps>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false}),
}))