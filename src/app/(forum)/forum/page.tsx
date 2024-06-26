import Link from "next/link";
import globeData from "@/lib/globe.json";
import ForumCard from "@/components/forum-card";
import BreadCrumb from "@/components/breadcrumb-custom";
import SidebarComponent from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { SearchCity } from "@/components/search";
import { isUserLoggedIn } from "@/lib/utils";
import { ForumCategoriesProps } from "@/lib/types";
import { SelectedCountryProvider } from "@/providers/selected-country-provider";

const Page = ({searchParams}: {searchParams: ForumCategoriesProps}) => {
  const { country, category, city } = searchParams;
  const countryData = globeData.features.find(({ properties }) => (properties.name.toLocaleLowerCase() === country?.toLocaleLowerCase().replaceAll('%20', ' ')));
  if (!countryData) {
    return notFound();
  }
  const statsData = {
    ...countryData?.properties,
    id: countryData?.id,
    };
  return (
    <SelectedCountryProvider>
      {country ?
        <main className="flex min-h-screen flex-col backdrop-filter backdrop-blur-xl overflow-hidden">
          <section className='absolute right-[7rem] top-7 z-50'>
          <Link href={
            !isUserLoggedIn() ? '/sign-in' :
            city ? '/post?country=' + country + '&city=' + city + '&category=' + category
            : '/post?country=' + country + '&category=' + category
          }>
            <Button>
              Publish New Post
            </Button>
          </Link>
        </section>
          <section className="space-y-5 mt-20 p-2 border">
            {city ? <h1 className="text-center text-4xl font-bold">{country} - {city}</h1>
            :
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-center text-4xl font-bold">{country}</h1>
                <SearchCity country={country}/>
              </div>
            }
          </section>
          <section className="px-5">
            <BreadCrumb country={country} city={city} category={category}/>
          </section>
          <div className="flex flex-1 gap-2 py-8">
              <SidebarComponent side={"left"} country={country} city={city} category={category} statsData={statsData} />
            <div className="flex w-full space-x-2">
              <section className="w-full">
                <ForumCard country={country} category={category} city={city}/>
              </section>
              <section>
                <SidebarComponent side={"right"} country={country} city={city} category={category} statsData={statsData} />
              </section>
            </div>
          </div>
        </main>
          : notFound()
      }
    </SelectedCountryProvider>
  )
}

export default Page


