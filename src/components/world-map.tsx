"use client";

import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import globeData from "@/lib/globe.json";
import capitalOfCountries from "@/lib/capital.json";
import Layout from './background-layout';
import {SearchCountry, SearchCity} from './search';
import { useSelectedCountry } from '@/providers/selected-country-provider';

const WorldMap = () => {
  const [tooltip, setTooltip] = useState({ content: "", x: 0, y: 0, visible: false });
  const { selectedCountry, setSelectedCountry, selectedCity, countryData } = useSelectedCountry();

  const handleMouseMove = ({ pageX, pageY }: {pageX:number, pageY:number}) => {
    // Offset values can be adjusted to position the tooltip as desired
    const xOffset = -10;  // Horizontal offset from the cursor
    const yOffset = 50;  // Vertical offset from the cursor

    // Adjust the tooltip position based on the mouse position
    const x = pageX + xOffset;
    const y = pageY + yOffset;

    setTooltip(prev => ({
      ...prev,
      x: pageX + xOffset,
      y: pageY + yOffset
    }));
  };

    const handleClick = (country: string) => {
      setSelectedCountry(country);
    }


  return (
    <Layout image="url('/ocean2.jpg')">
      <section id="home-1" className='flex flex-col h-[70rem] items-center justify-center backdrop-filter backdrop-blur-xl'>
        <div className='absolute top-10 z-50 flex space-x-5'>
          <SearchCountry />
        </div>
          <ComposableMap className=' w-full mx-10 invisible sm:visible' onMouseMove={handleMouseMove}>
            <Geographies geography={globeData}>
              {({ geographies }) =>
                geographies.map(geo => (
                  <Geography
                    className="cursor-pointer"
                    key={geo.rsmKey}
                    geography={geo}
                    // fill="#1"
                    stroke="#000"
                    strokeWidth={0.2}
                    onMouseEnter={({ pageX, pageY }) => {
                      setTooltip({ content: geo.properties.name, x: pageX, y: pageY, visible: true });
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => {
                      setTooltip(prev => ({ ...prev, visible: false }));
                    }}
                    onClick={() => handleClick(geo.properties.name)}
                    style={{
                      default: { fill: "#E7E6E1", outline: 100 },
                      hover: { fill: "#F53", outline: 100},
                      pressed: { fill: "#000", outline: 100 },
                    }}
                  />
                ))
              }
            </Geographies>

            {capitalOfCountries.features.map(({ properties, geometry ,id }) => (
              <Marker key={id} coordinates={[geometry.coordinates[0], geometry.coordinates[1]]}
                onMouseEnter={({ pageX, pageY }) => {
                  setTooltip({ content: properties?.city || properties.country, x: pageX, y: pageY, visible: true });
                }}
                onMouseMove={handleMouseMove}
                onClick={() => handleClick(properties.country)}
                onMouseLeave={() => {
                  setTooltip(prev => ({ ...prev, visible: false }));
                }}
              >
                <circle className="cursor-pointer" r={1.5} fill="#F00" stroke="#FFF" strokeWidth={0.5} />
              </Marker>
            ))}

          </ComposableMap>

        {tooltip.visible && (
          <div style={{
            position: 'absolute',
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            backgroundColor: 'white',
            padding: '10px 10px',
            border: '1px solid black',
            borderRadius: '5px',
            pointerEvents: 'none', // This makes the div "click-through"
            zIndex: 1000
          }}>
            {tooltip.content}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default WorldMap;
