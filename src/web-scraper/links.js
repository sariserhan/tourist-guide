const links = [
  "https://www.commisceo-global.com/resources/country-guides/afghanistan-guide",
  "https://www.commisceo-global.com/resources/country-guides/algeria-guide",
  "https://www.commisceo-global.com/resources/country-guides/angola-guide",
  "https://www.commisceo-global.com/resources/country-guides/argentina-guide",
  "https://www.commisceo-global.com/resources/country-guides/australia-guide",
  "https://www.commisceo-global.com/resources/country-guides/austria-guide",
  "https://www.commisceo-global.com/resources/country-guides/azerbaijan-guide",
  "https://www.commisceo-global.com/resources/country-guides/bahrain-guide",
  "https://www.commisceo-global.com/resources/country-guides/bangladesh-guide",
  "https://www.commisceo-global.com/resources/country-guides/belgium-guide",
  "https://www.commisceo-global.com/resources/country-guides/bolivia-guide",
  "https://www.commisceo-global.com/resources/country-guides/brazil-guide",
  "https://www.commisceo-global.com/resources/country-guides/brunei-guide",
  "https://www.commisceo-global.com/resources/country-guides/bulgaria-guide",
  "https://www.commisceo-global.com/resources/country-guides/cambodia-guide",
  "https://www.commisceo-global.com/resources/country-guides/cameroon-guide",
  "https://www.commisceo-global.com/resources/country-guides/canada-guide",
  "https://www.commisceo-global.com/resources/country-guides/chile-guide",
  "https://www.commisceo-global.com/resources/country-guides/china-guide",
  "https://www.commisceo-global.com/resources/country-guides/colombia-guide",
  "https://www.commisceo-global.com/resources/country-guides/costa-rica-guide",
  "https://www.commisceo-global.com/resources/country-guides/croatia-guide",
  "https://www.commisceo-global.com/resources/country-guides/cyprus-guide",
  "https://www.commisceo-global.com/resources/country-guides/czech-republic-guide",
  "https://www.commisceo-global.com/resources/country-guides/denmark-guide",
  "https://www.commisceo-global.com/resources/country-guides/dominican-republic-guide",
  "https://www.commisceo-global.com/resources/country-guides/ecuador-guide",
  "https://www.commisceo-global.com/resources/country-guides/egypt-guide",
  "https://www.commisceo-global.com/resources/country-guides/el-salvador-guide",
  "https://www.commisceo-global.com/resources/country-guides/estonia-guide",
  "https://www.commisceo-global.com/resources/country-guides/ethiopia-guide",
  "https://www.commisceo-global.com/resources/country-guides/finland-guide",
  "https://www.commisceo-global.com/resources/country-guides/france-guide",
  "https://www.commisceo-global.com/resources/country-guides/georgia-guide",
  "https://www.commisceo-global.com/resources/country-guides/germany-guide",
  "https://www.commisceo-global.com/resources/country-guides/ghana-guide",
  "https://www.commisceo-global.com/resources/country-guides/greece-guide",
  "https://www.commisceo-global.com/resources/country-guides/hong-kong-guide",
  "https://www.commisceo-global.com/resources/country-guides/hungary-guide",
  "https://www.commisceo-global.com/resources/country-guides/india-guide",
  "https://www.commisceo-global.com/resources/country-guides/indonesia-guide",
  "https://www.commisceo-global.com/resources/country-guides/iran-guide",
  "https://www.commisceo-global.com/resources/country-guides/iraq-guide",
  "https://www.commisceo-global.com/resources/country-guides/ireland-guide",
  "https://www.commisceo-global.com/resources/country-guides/italy-guide",
  "https://www.commisceo-global.com/resources/country-guides/jamaica-guide",
  "https://www.commisceo-global.com/resources/country-guides/japan-guide",
  "https://www.commisceo-global.com/resources/country-guides/kazakhstan-guide",
  "https://www.commisceo-global.com/resources/country-guides/kenya-guide",
  "https://www.commisceo-global.com/resources/country-guides/kuwait-guide",
  "https://www.commisceo-global.com/resources/country-guides/latvia-guide",
  "https://www.commisceo-global.com/resources/country-guides/lebanon-guide",
  "https://www.commisceo-global.com/resources/country-guides/libya-guide",
  "https://www.commisceo-global.com/resources/country-guides/lithuania-guide",
  "https://www.commisceo-global.com/resources/country-guides/luxembourg-guide",
  "https://www.commisceo-global.com/resources/country-guides/malaysia-guide",
  "https://www.commisceo-global.com/resources/country-guides/mexico-guide",
  "https://www.commisceo-global.com/resources/country-guides/morocco-guide",
  "https://www.commisceo-global.com/resources/country-guides/netherlands-guide",
  "https://www.commisceo-global.com/resources/country-guides/new-zealand-guide",
  "https://www.commisceo-global.com/resources/country-guides/nigeria-guide",
  "https://www.commisceo-global.com/resources/country-guides/norway-guide",
  "https://www.commisceo-global.com/resources/country-guides/pakistan-guide",
  "https://www.commisceo-global.com/resources/country-guides/phillippines-guide",
  "https://www.commisceo-global.com/resources/country-guides/poland-guide",
  "https://www.commisceo-global.com/resources/country-guides/portugal-guide",
  "https://www.commisceo-global.com/resources/country-guides/romania-guide",
  "https://www.commisceo-global.com/resources/country-guides/russia-guide",
  "https://www.commisceo-global.com/resources/country-guides/saudi-arabia-guide",
  "https://www.commisceo-global.com/resources/country-guides/senegal-guide",
  "https://www.commisceo-global.com/resources/country-guides/singapore-guide",
  "https://www.commisceo-global.com/resources/country-guides/slovakia-guide",
  "https://www.commisceo-global.com/resources/country-guides/slovenia-guide",
  "https://www.commisceo-global.com/resources/country-guides/south-africa-guide",
  "https://www.commisceo-global.com/resources/country-guides/south-korea-guide",
  "https://www.commisceo-global.com/resources/country-guides/spain-guide",
  "https://www.commisceo-global.com/resources/country-guides/sri-lanka-guide",
  "https://www.commisceo-global.com/resources/country-guides/sweden-guide",
  "https://www.commisceo-global.com/resources/country-guides/taiwan-guide",
  "https://www.commisceo-global.com/resources/country-guides/thailand-guide",
  "https://www.commisceo-global.com/resources/country-guides/the-bahamas-guide",
  "https://www.commisceo-global.com/resources/country-guides/tunisia-guide",
  "https://www.commisceo-global.com/resources/country-guides/turkey-guide",
  "https://www.commisceo-global.com/resources/country-guides/uae-guide",
  "https://www.commisceo-global.com/resources/country-guides/uk-guide",
  "https://www.commisceo-global.com/resources/country-guides/ukraine-guide",
  "https://www.commisceo-global.com/resources/country-guides/usa-guide",
  "https://www.commisceo-global.com/resources/country-guides/venezuela-guide",
  "https://www.commisceo-global.com/resources/country-guides/vietnam-guide",
  "https://www.commisceo-global.com/resources/country-guides/switzerland-guide",
  "https://www.commisceo-global.com/resources/country-guides/mongolia-culture-guide",
  "https://www.commisceo-global.com/resources/country-guides/panama-guide",
  "https://www.commisceo-global.com/resources/country-guides/peru-guide",
  "https://www.commisceo-global.com/resources/country-guides/uruguay-guide",
  "https://www.commisceo-global.com/resources/country-guides/puerto-rico-guide",
  "https://www.commisceo-global.com/resources/country-guides/serbia-guide"
]

module.exports = links;
