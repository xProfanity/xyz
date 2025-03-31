"use client"

import React, { createContext, useEffect } from "react";

const RouteController = () => {
    console.log("Context called");
    
    useEffect(() => {
        if(!localStorage.getItem('access')) {
            return console.log("access token available");
        }

        return console.log("access token not available");
        
    }, [])
}

const RouteControllerContext = createContext(RouteController)

export default function RouteControllerProvider({children}: {children: React.ReactNode}) {
    return (
        <RouteControllerContext.Provider value={RouteController}>
            {children}
        </RouteControllerContext.Provider>
    )
}