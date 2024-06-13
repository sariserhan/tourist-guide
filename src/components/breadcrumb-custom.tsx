import { ForumCategoriesProps } from '../lib/types';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

type BreadCrumbProps = ForumCategoriesProps & {
  title?: string;
}

export default function BreadCrumb({country, city, category, title}: BreadCrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
          <BreadcrumbSeparator />
          {title && city &&
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={'/forum?country=' + country + '&city=' + "" + '&category=' + category}>{country}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={'/forum?country=' + country + '&city=' + city + '&category=' + category}>{city}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          }
          {!title && city &&
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={'/forum?country=' + country + '&city=' + "" + '&category=' + category}>{country}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{city}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          }
          {title && !city &&
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href={'/forum?country=' + country + '&city=' + "" + '&category=' + category}>{country}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{title}</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          }
          {!title && !city &&
            <BreadcrumbItem>
              <BreadcrumbPage>{country}</BreadcrumbPage>
            </BreadcrumbItem>
          }

      </BreadcrumbList>
    </Breadcrumb>
  )
}
