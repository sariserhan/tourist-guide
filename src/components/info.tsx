"use client";

import globeData from "@/lib/globe.json";
import { useSelectedCountry } from '@/providers/selected-country-provider';
import Stats from "./stats";

const Info = () => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const countryData = globeData.features.find(({ properties }) => (properties.name === selectedCountry));
  const statsData = {
    ...countryData?.properties,
    id: countryData?.id,
  };

  return (
    <section id="home-2" className="flex-col">
      <div className="">
        {selectedCountry && (
            <Stats {...statsData as StatsProps}/>
          )}
      </div>
    </section>
  );
}

export default Info
