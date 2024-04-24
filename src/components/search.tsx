"use client";

import { ChangeEvent, useEffect, useState } from "react";
import countryData from "@/lib/globe.json";
import { useRouter } from 'next/navigation';

export default function Search({valueFromMap}: {valueFromMap:string}) {
    const [value, setValue] = useState("");
    const router = useRouter();

    const countries = countryData.features.map(({ properties }) => (
            properties.name
    ));

    const selectedCountry = countries.find((country) =>
                            country.toLowerCase() === value?.toLowerCase());

    useEffect(() => {
        setValue(valueFromMap);
    }, [valueFromMap]);

    useEffect(() => {
        const element = document.getElementById("home-2");
        if (selectedCountry) {
            router.push(`/#country=${encodeURIComponent(selectedCountry)}`);
            selectedCountry && setTimeout(() => {
                element?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
        }
    }, [selectedCountry, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
     };

  return (
    <div className="relative w-[17rem] z-50" >
        <input
            type="text"
            id="search"
            list="countries"
            placeholder=" Search for country..."
            value={value}
            onChange={(e) => handleChange(e)}
            className="w-full rounded-lg border border-black py-2.5 pl-1 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />

        {value && !countries.includes(value) &&
            <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 w-full">
            {
                countries.filter((country) => (
                    country.toLowerCase().startsWith(value?.toLowerCase())
                )).slice(0,20).map((country) => (
                    <li
                        key={country}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setValue(country)}
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
