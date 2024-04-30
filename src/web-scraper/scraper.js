const puppeteer = require("puppeteer");
const fs = require('fs');
const links = require("./links");

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const link of links) {
        if (link.includes('/resources/country-guides/')) {
            await getAllLi(page, link);
        }
    }

    await browser.close();
})();


async function getAllLi(page, countryLink) {
    console.log('Getting data from:', countryLink);
    await page.goto(countryLink);

    const data = await page.evaluate(() => {
        const allLi = Array.from(document.querySelectorAll('ul'));
        return allLi.map(ul => ul.textContent)
                    .map(e => e.split('\n').filter(Boolean))
                    .slice(7, -2);
    });

    const fileName = countryLink.split('/').slice(-1)[0];
    const jsonData = JSON.stringify(data, null, 2);
    const filePath = `${fileName}.json`;

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('Data written to file successfully!');
    });
}


async function getLinks() {
  await page.goto('https://www.commisceo-global.com/resources/country-guides/');

  const allHref = await page.evaluate(() => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    return allLinks.map(link => link.href);
  });
    const uniqueLinks = [...new Set(allHref)];
    return uniqueLinks;
}

//   await page.screenshot({ path: 'example.png' });


  // Set screen size
//   await page.setViewport({width: 1080, height: 1024});

  // Type into search box
//   await page.type('.devsite-search-field', 'automate beyond recorder');

  // Wait and click on first result
//   const searchResultSelector = '.devsite-result-item-link';
//   await page.waitForSelector(searchResultSelector);
//   await page.click(searchResultSelector);

  // Locate the full title with a unique string
//   const textSelector = await page.waitForSelector(
//     'text/Customize and automate'
//   );
//   const fullTitle = await textSelector?.evaluate(el => el.textContent);

  // Print the full title
//   console.log('The title of this blog post is "%s".', fullTitle);
