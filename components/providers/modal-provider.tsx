"use client";

import { useState,useEffect } from "react";
import { SettingsModal } from "../modals/setting-modal";
export const Modalprovider = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }
    , []);
    if(!isMounted) {
        return null;
    }
    return (
        <>
            <SettingsModal/>
        </>
    )
}
