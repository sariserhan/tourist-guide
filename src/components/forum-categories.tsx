import Link from "next/link"
import { ForumCategoriesProps } from "@/lib/types";

const ForumCategories = ({country, city, category}: ForumCategoriesProps) => {
    return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <h3 className="mb-2 text-lg font-semibold ml-1">Categories</h3>
        <nav className="space-y-1">
            <Link
                className={category === "general" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=general&city=${city}`}
                prefetch={true}
            >
                General
            </Link>
            <Link
                className={category === "cuisine-food" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=cuisine-food&city=${city}`}
                prefetch={true}
            >
                Cuisine/Food
            </Link>
            <Link
                className={category === "attractions-sightseeing" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=attractions-sightseeing&city=${city}`}
                prefetch={true}
            >
                Attractions and Sightseeing
            </Link>
            <Link
                className={category === "accommodation" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=accommodation&city=${city}`}
                prefetch={true}
            >
                Accommodation
            </Link>
            <Link
                className={category === "transportation" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=transportation&city=${city}`}
                prefetch={true}
            >
                Transportation
            </Link>
            <Link
                className={category === "language-communication" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=language-communication&city=${city}`}
                prefetch={true}
            >
                Language and Communication
            </Link>
            <Link
                className={category === "visa-entry" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=visa-entry&city=${city}`}
                prefetch={true}
            >
                Visa and Entry Requirements
            </Link>

            <Link
                className={category === "safety-health" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=safety-health&city=${city}`}
                prefetch={true}
            >
                Safety and Health
            </Link>
            <Link
                className={category === "currency-money" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=currency-money&city=${city}`}
                prefetch={true}
            >
                Currency and Money Matters
            </Link>
            <Link
                className={category === "culture-customs" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=culture-customs&city=${city}`}
                prefetch={true}
            >
                Culture and Customs
            </Link>
            <Link
                className={category === "climate-weather" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=climate-weather&city=${city}`}
                prefetch={true}
            >
                Climate and Weather
            </Link>
            <Link
                className={category === "promotions" ?
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 focus:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800" :
                    "block rounded-md px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-50 dark:hover:bg-gray-800"}
                href={`/forum?country=${country}&category=promotions&city=${city}`}
                prefetch={true}
            >
                Promotions
            </Link>
        </nav>
    </div>
    )
}

export default ForumCategories;
