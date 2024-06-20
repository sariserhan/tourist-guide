"use client";

import ChatList from './chat-list';
import ForumCategories from './forum-categories';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { StatsProps } from "@/lib/types";
import { HiOutlineChatAlt } from "react-icons/hi";
import { SidebarIcon, XIcon } from 'lucide-react'; // Adjust the import path as necessary
import { StatsLeft, StatsRight } from './stats';

interface SidebarProps {
  side: 'left' | 'right';
  country?: string;
  city?: string;
  category?: "general" | "cuisine-food" | "attractions-sightseeing" | "accommodation" | "transportation" | "language-communication" | "visa-entry" | "safety-health" | "currency-money" | "culture-customs" | "climate-weather" | "promotions";
  statsData?: StatsProps;
}

const SidebarComponent = ({ side, country, city, category, statsData }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div className={`transition-all ${isOpen ? (side === 'left' ? 'ml-[20rem]' : 'mr-[20rem]') : ''} flex-1`} />
      <div>
        {!isOpen && (
          <Button onClick={toggleSidebar} variant="secondary">
            {side === 'left' ?
              <SidebarIcon />
            :
              <HiOutlineChatAlt size={30}/>
            }
          </Button>
        )}
        <div
          className={`fixed ${side === 'left' ? 'left-0' : 'right-0'} h-screen bg-white border-t border-b rounded-lg transition-transform ${
            isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
          }`}
          style={{ width: '20rem' }}
        >
          {isOpen && (
            <div className="flex p-2 justify-between">
              <div className='flex items-center text-lg font-semibold w-full'>
                {side === "right" ? "Online Users" : "Categories"}
              </div>
              <div className='justify-end items-center'>
                <XIcon className="cursor-pointer" onClick={toggleSidebar} />
              </div>
            </div>
          )}
          <div>
            {side === "right" ?
              <section className="flex flex-col gap-2 w-full bg-gray-100">
                <ChatList />
                {statsData && <StatsRight stats={statsData}/>}
              </section>
            :
            <section className="flex flex-col gap-2 w-full bg-gray-100">
              {country && category && <ForumCategories country={country} city={city || ""} category={category}/>}
              {statsData && <StatsLeft stats={statsData}/>}
            </section>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
