"use client";

import globeData from "@/lib/globe.json";
import { useSelectedCountry } from '@/lib/selected-country-context';
import Stats from "./stats";
import LongCard from "./long-card";

const Info = () => {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();
  const countryData = globeData.features.find(({ properties }) => (properties.name === selectedCountry));
  const statsData = {
    ...countryData?.properties,
    id: countryData?.id,
  };
  let data = null;
  const country = selectedCountry?.replace(/ /g, '-').toLowerCase();
  if (country) {
    try {
      data = require(`@/lib/scraped-data/${country}-guide.json`)
      data?.map((article, index) => (
        console.log(article, index)
      ))
    } catch (e) {
      console.error("No data found for this country")
    }
  }
  return (
    <section id="home-2" className="flex-col">
      <div className="">
        {selectedCountry && (
            <Stats {...statsData as StatsProps}/>
          )}
      </div>
      {/* <div className="max-h-50 grid grid-cols-3 gap-5">
        {data &&
          data.map((article:string, index:number) => (
            <LongCard key={index} article={article} />
        ))}
      </div> */}

    </section>
  );
}

export default Info
