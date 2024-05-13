import Divider from "@/components/divider";
import ForumCard from "@/components/forum-card";
import ForumCategories from "@/components/forum-categories";
import Stats from "@/components/stats";
import globeData from "@/lib/globe.json";
import Link from "next/link";
import { SearchCity } from "@/components/search";
import { SelectedCountryProvider } from "@/providers/selected-country-provider";
import { notFound } from "next/navigation";
import { ForumCategoriesProps } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { isUserLoggedIn } from "@/lib/utils";


const Page = ({searchParams}: {searchParams: ForumCategoriesProps}) => {
  const { country, category, city } = searchParams;
  const countryData = globeData.features.find(({ properties }) => (properties.name.toLocaleLowerCase() === country.toLocaleLowerCase().replaceAll('%20', ' ')));
  const countryName = countryData?.properties.name || null
  const statsData = {
    ...countryData?.properties,
    id: countryData?.id,
    };

  let go = ''
  if (!isUserLoggedIn()) {
    go = process.env.CLERK_SIGN_IN_FALLBACK_REDIRECT_URL as string
  } else {
    go = '/post?country=' + countryName + '&city=' + city + '&category=' + category
  }
  return (
    <SelectedCountryProvider>
      {countryName ?
        <section className="flex min-h-screen flex-col mt-20">
          <div className='absolute right-[7rem] top-7 z-50'>
          <Link href={go}>
            <Button>
              Publish New Post
            </Button>
          </Link>
        </div>
          <div className="space-y-10">
            {city ? <h1 className="text-center text-4xl font-bold">{countryName} - {city}</h1>
            : <h1 className="text-center text-4xl font-bold">{countryName}</h1>
            }
            <div className="flex items-center justify-center gap-2 border p-2">
              {!city && <SearchCity country={countryName}/>}
            </div>
          </div>
          <div className="container mx-auto flex flex-1 gap-8 py-8">
            <div className="hidden w-[240px] flex-col gap-4 md:flex">
              <ForumCategories country={countryName} city={city} category={category}/>
            </div>
            <div className="flex-1">
              <div className="grid gap-6">
                <ForumCard country={country} category={category} city={city}/>
              </div>
            </div>
          </div>
              <Divider />
            <Stats {...statsData}/>
        </section>
          : notFound()
      }
    </SelectedCountryProvider>
  )
}

export default Page
