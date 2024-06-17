import { IoFastFoodOutline } from "react-icons/io5";
import { FaPeopleGroup, FaTemperatureHigh, FaPhoneFlip, FaLandmarkFlag, FaLanguage } from "react-icons/fa6";
import { RiGovernmentFill } from "react-icons/ri";
import { GiAfrica, GiSouthAmerica, GiAustralia, GiEuropeanFlag } from "react-icons/gi";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { GiVikingChurch, GiLifeBar, GiEarthAfricaEurope, GiIsland } from "react-icons/gi";
import { FaChartArea, FaMosque, FaChurch, FaStarOfDavid } from "react-icons/fa";
import { MdOutlineCurrencyExchange, MdTempleHindu, MdTempleBuddhist } from "react-icons/md";
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import getSymbolFromCurrency from 'currency-symbol-map'
import { ScrollArea } from "./ui/scroll-area";

type StatsProps = {
        id?: string | undefined
        name?: string | null
        capital?: string | null
        government?: string | null
        currency_code?: string | null
        currency?: string | null
        continent?: string | null
        region?: string | null
        population?: number | null
        calling_code?: string | number
        surface_area?: number | null
        national_dish?: string | null
        religion?: string | null
        life_expectancy?: number | null
        yearly_avg_temperature?: number | null
        languages?: string[]
        cities?: string[]
}

const Stats = ({stats}: {stats: StatsProps}) => {
    const population = stats.population ? ((stats.population / 1e6).toFixed(2) + 'M') : null
    const surface_area = stats.surface_area ? ((stats.surface_area / 1e6) > 1 ? (stats.surface_area / 1e6).toFixed(2) + 'M km²' : (stats.surface_area / 1e3).toFixed(2) + 'K km²') : null

    return (
        <div className="flex flex-1 justify-center w-[20rem]">
        <div className="grid grid-cols-1 gap-2 justify-center ">
            {stats.name &&
            <article className="flex items-center gap-4 rounded-lg border border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border ">
                    {stats.id ? getUnicodeFlagIcon(stats.id) : <GiIsland />}
                </span>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.name}</p>
                </div>
            </article>}
            {stats.capital &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-gray-500">
                    <RiGovernmentFill size={30}/>
                </span>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Capital</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.capital}</p>
                </div>
            </article>
            }
            {stats.government &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-gay-400">
                    <FaLandmarkFlag size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Government Type</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.government}</p>
                </div>
            </article>
            }
            {stats.currency_code &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-green-500 text-2xl">
                    {getSymbolFromCurrency(stats.currency_code)
                    || <MdOutlineCurrencyExchange size={30}/>}
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Currency</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{`${stats.currency_code} - ${stats.currency}`}</p>
                </div>
            </article>
            }
            {stats.continent &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-amber-700">
                    {
                        stats.continent === 'Africa' ? <GiAfrica size={30}/>
                        : stats.continent === 'Europe' ? <GiEuropeanFlag size={30}/>
                        : stats.continent === 'Asia' ? <BsGlobeCentralSouthAsia size={30}/>
                        : stats.continent === 'North America' ? <GiSouthAmerica size={30}/>
                        : stats.continent === 'South America' ? <GiSouthAmerica size={30}/>
                        : stats.continent === 'Oceania' ? <GiAustralia size={30}/>
                        : <GiEarthAfricaEurope size={30}/>
                    }
                </span>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Continent</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.continent}</p>
                </div>
            </article>
            }
            {stats.region &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-yellow-400">
                    <GiEarthAfricaEurope size={30}/>
                </span>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Region</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.region}</p>
                </div>
            </article>
            }

            {stats.population && (stats.population > 0) &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-lime-600">
                    <FaPeopleGroup size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Population</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{population}</p>
                </div>
            </article>
            }
            {stats.calling_code &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-purple-400">
                    <FaPhoneFlip size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Calling Code</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.calling_code}</p>
                </div>
            </article>
            }
            {stats.surface_area &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-slate-400">
                    <FaChartArea size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Surface Area</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{surface_area}</p>
                </div>
            </article>
            }
            {stats.national_dish &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-orange-400">
                    <IoFastFoodOutline size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">National Dish</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.national_dish}</p>

                </div>
            </article>
            }
            {stats.religion &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-green-700">
                    {
                        stats.religion === 'Christianity' ? <FaChurch size={30}/>
                        : stats.religion === 'Islam' ? <FaMosque size={30}/>
                        : stats.religion === 'Hinduism' ? <MdTempleHindu size={30}/>
                        : stats.religion === 'Buddhism' ? <MdTempleBuddhist size={30}/>
                        : stats.religion === 'Judaism' ? <FaStarOfDavid size={30}/>
                        : <GiVikingChurch size={30}/>
                    }
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Religion</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.religion}</p>
                </div>
            </article>
            }
            {stats.life_expectancy &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-blue-500">
                    <GiLifeBar size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Life Expectancy</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.life_expectancy} year</p>
                </div>
            </article>
            }
            {stats.yearly_avg_temperature &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-red-400">
                    <FaTemperatureHigh size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yearly Average Temperature</p>
                    <p className="text-xl font-medium text-gray-900 dark:text-white">{stats.yearly_avg_temperature}°C</p>
                </div>
            </article>
            }

            {stats.languages &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-blue-400">
                    <FaLanguage size={30}/>
                </span>

                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Languages</p>
                    <ScrollArea className="max-h-[200px] overflow-y-auto w-auto rounded-md p-4 border scroll-bar-visible">
                        {stats.languages.map((language, index) => (
                        <span key={index} className="inline-block px-2 py-1 mr-2 text-xs font-semibold text-white bg-gray-500 rounded-md">{language}</span>
                    ))
                    }
                    </ScrollArea>
                </div>
            </article>
            }
            {/* {stats.cities &&
            <article className="flex items-center gap-4 rounded-lg border  border-gray-200 p-6 dark:border-slate-800 dark:bg-black bg-white">
                <span className="p-3 rounded-full border text-stone-400">
                    <GiModernCity size={30}/>
                </span>

                <div className="z-50 w-auto">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cities</p>
                    <ScrollArea className="max-h-40 overflow-y-auto w-auto rounded-md p-4 border scroll-bar-visible">
                        {stats.cities.map((city, index) => (
                        <span key={index} className="inline-block px-2 py-1 mr-2 text-xs font-semibold text-white bg-gray-500 rounded-md">{city}</span>
                    ))
                    }
                    </ScrollArea>
                </div>
            </article>
            } */}
            </div>
        </div>
    )
}

export default Stats
