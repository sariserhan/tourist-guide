"use client";

import { createContext, useContext, useState } from 'react';

const SelectedCountryContext = createContext<any>(null); // Provide a default value for the createContext function

export const useSelectedCountry = () => useContext(SelectedCountryContext);

export const SelectedCountryProvider = ({ children }: { children: React.ReactNode}) => {
    const [selectedCountry, setSelectedCountry] = useState(null); // Update the initial value here

    return (
        <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
            {children}
        </SelectedCountryContext.Provider>
    );
};
