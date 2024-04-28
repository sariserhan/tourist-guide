"use client";

import globeData from "@/lib/globe.json";
import { useSelectedCountry } from '@/lib/selected-country-context';
import Stats from "./stats";


const Info = () => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const countryData = globeData.features.find(({ properties }) => (properties.name === selectedCountry));
  const statsData = {
    ...countryData?.properties,
    id: countryData?.id,
  };

  return (
    <section id="home-2" className="-mt-[46rem]">
      {selectedCountry && (
          <Stats {...statsData as StatsProps}/>
      )}
    </section>
  )
}

export default Info
