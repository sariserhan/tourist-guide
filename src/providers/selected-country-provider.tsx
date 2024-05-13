"use client";

import { createContext, useContext, useState } from 'react';
import globeData from "@/lib/globe.json";

const SelectedCountryContext = createContext<any>(null); // Provide a default value for the createContext function

export const useSelectedCountry = () => useContext(SelectedCountryContext);

export const SelectedCountryProvider = ({ children }: { children: React.ReactNode}) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const countryData = globeData.features.find(({ properties }) => (properties.name === selectedCountry));

    return (
        <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry, selectedCity, setSelectedCity, countryData }}>
            {children}
        </SelectedCountryContext.Provider>
    );
};
