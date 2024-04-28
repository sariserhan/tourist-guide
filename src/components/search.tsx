"use client";

import { ChangeEvent, useEffect } from "react";
import countryData from "@/lib/globe.json";
import { useRouter } from 'next/navigation';
import { useSelectedCountry } from '@/lib/selected-country-context';
import { ImCancelCircle } from "react-icons/im";

export default function Search() {
    const { selectedCountry, setSelectedCountry } = useSelectedCountry();
    const router = useRouter();

    const countries = countryData.features.map(({ properties }) => (
            properties.name
    ));

    const countryPicked = countries.find((country) =>
                            country.toLowerCase() === selectedCountry?.toLowerCase());

    useEffect(() => {
        const element = document.getElementById("home-2");
        if (countryPicked) {
            router.push(`/#country=${encodeURIComponent(countryPicked)}`);
            countryPicked && setTimeout(() => {
                element?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
        }
    }, [countryPicked, router]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedCountry(e.target.value);
     };

  return (
    <div className="relative w-[17rem] z-50" >
        <input
            type="text"
            id="search"
            list="countries"
            placeholder=" Search for country..."
            value={selectedCountry}
            onChange={(e) => handleChange(e)}
            className="w-full rounded-lg border border-black py-2.5 pl-1 shadow-sm sm:text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
        {selectedCountry &&
            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                    onClick={() => setSelectedCountry("")}
                >
                     <ImCancelCircle />
                </button>
            </span>
        }

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
