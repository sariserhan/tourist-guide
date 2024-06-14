"use client";

import globeData from "@/lib/globe.json";
import countryData from "@/lib/globe.json";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { useSelectedCountry } from '@/providers/selected-country-provider';
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useRouter } from "next/navigation";

export function SearchCountry() {
    const { selectedCountry, setSelectedCountry } = useSelectedCountry();
    const [showCountries, setShowCountries] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowCountries(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [showCountries]);

    const countries = countryData.features.map(({ properties }) => (
        properties.name
    ));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedCountry(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/forum?country=${selectedCountry}&category=general&city=`);
    };

    return (
    <div className="relative  z-50" >
        <div className="flex items-center justify-normal gap-5">
            <PlaceholdersAndVanishInput
                placeholders={[...countries]}
                textValue={selectedCountry}
                onChange={(e) => handleChange(e)}
                onSubmit={onSubmit}
                countries={countries}
            />
        </div>

        {showCountries && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-[50rem] overflow-y-auto"
                ref={dropdownRef}
            >

            {countries.map((country) => (
                    <li
                        key={country}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer "
                        onClick={() => {
                            setSelectedCountry(country)
                            setShowCountries(!showCountries)
                        }}
                    >
                        {country}
                    </li>
                ))
            }
            </ul>
        )}
        {selectedCountry && !countries.includes(selectedCountry) &&
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full">
            {
                countries.filter((country) => (
                    country.toLowerCase().startsWith(selectedCountry?.toLowerCase())
                )).slice(0,20).map((country) => (
                    <li
                        key={country}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedCountry(country)}
                    >
                        {country}
                    </li>
                ))
            }
            </ul>
        }
    </div>
    );
}

export function SearchCity({country}: {country: string}) {
    const { selectedCountry, selectedCity, setSelectedCity } = useSelectedCountry();
    const [showCities, setShowCities] = useState(false);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const router = useRouter();
    const countryData = globeData.features.find(({ properties }) => (properties.name === country));
    const cityData = (countryData?.properties.cities) || [];
    const cities = cityData.filter((city, index) => cityData.indexOf(city) === index)

    useEffect(() => {
        setSelectedCity("");
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowCities(false);
            }
        }

        document.body.addEventListener('click', handleClickOutside);
        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };

    }, [selectedCountry, setSelectedCity]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/forum?country=${country}&category=general&city=${selectedCity}`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedCity(e.target.value);
    };

    return (
    <div className="relative w-[17rem] z-50" >
        {cities.length > 0 &&
        <PlaceholdersAndVanishInput
            placeholders={[...cityData]}
            textValue={selectedCity}
            onChange={(e) => handleChange(e)}
            onSubmit={onSubmit}
            cities={cityData}
        />}

        {cities.length > 0 && showCities && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-[50rem]"
                ref={dropdownRef}
            >
            {cities.map((city) => (
                    <li
                        key={city}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer overflow-y-auto"
                        onClick={() => {
                            setSelectedCity(city)
                            setShowCities(!showCities)
                        }}
                    >
                        {city}
                    </li>
                ))
            }
            </ul>
        )}

        {cities.length > 0 && selectedCity && !cities.includes(selectedCity) &&
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full">
            {cities.filter((city) => (
                city.toLowerCase().startsWith(selectedCity?.toLowerCase())
                    )).slice(0,20).map((city) => (
                    <li
                        key={city}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedCity(city)}
                    >
                        {city}
                    </li>
                ))
            }
            </ul>
        }
    </div>
    );
}


