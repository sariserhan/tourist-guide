const DetailList = (stats: StatsProps) => {
  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm bg-gray-300">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Name</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.name}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Capital</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.capital}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Continent</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.continent}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Region</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.region}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Languages</dt>
                <dd className="text-gray-700 sm:col-span-2">{
                    stats.languages.map((lang, index) => (
                        <span key={index} className="inline-block px-2 py-1 mr-2 mt-2 text-xs font-semibold text-white bg-gray-500 rounded-md">{lang}</span>
                    ))
                }</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Currency</dt>
                <dd className="text-gray-700 sm:col-span-2">{`${stats.currency_code} - ${stats.currency}`}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Population</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.population}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Calling Code</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.calling_code}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Surface Area</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.surface_area}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">National Dish</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.national_dish}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Religion</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.religion}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Life Expectancy</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.life_expectancy} year</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Yearly Average Temperature</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.yearly_avg_temperature}C</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Government Type</dt>
                <dd className="text-gray-700 sm:col-span-2">{stats.government}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-gray-900">Cities</dt>
                <dd className="text-gray-700 sm:col-span-2">{
                    stats.cities.map((city, index) => (
                        <span key={index} className="inline-block px-2 py-1 mr-2 text-xs font-semibold text-white bg-gray-500 rounded-md">{city}</span>
                    )).slice(0, 5)
                }
                </dd>
            </div>
        </dl>
        </div>
  )
}

export default DetailList
