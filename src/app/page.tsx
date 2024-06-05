import WorldMap from '@/components/world-map';
import Layout from '@/components/background-layout';
import Contact from '@/components/contact';
import { SelectedCountryProvider } from '@/providers/selected-country-provider';
// import { UserProvider } from '@/providers/user-store-provider';

export default function Home() {
  return (
      <section className=''>
        <SelectedCountryProvider>
          <div className='h-[70rem]'>
            <WorldMap />
          </div>
          <Layout className=" rotate-180 scale-x-[-1]" image="url('/ocean2.jpg')">
            <div className='h-[70rem] flex flex-col items-center justify-center backdrop-filter backdrop-blur-xl  rotate-180 scale-x-[-1]'>
              {/* <Info /> */}
            </div>
          </Layout>
          <Layout className="" image="url('/ocean2.jpg')">
            <div className='h-[70rem] backdrop-filter backdrop-blur-xl'>
              <Contact />
            </div>
          </Layout>
        </SelectedCountryProvider>
      </section>
  );
}
