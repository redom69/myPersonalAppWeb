const puppeteer = require('puppeteer-core');

async function main() {
  // Go to localhost:4200
  const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://localhost:3000`,
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    },
  });

  const page = await browser.newPage();
  await page.goto(
    'http://localhost:10001/?patient_id=9c7bbbc3-f695-4ae5-94aa-bdfefafb1135&&start=2022-12-02&&end=2023-07-19',
    {
      waitUntil: 'networkidle2',
    },
  );

  // Print to pdf
  await page.pdf({
    path: 'test.pdf',
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    margin: {
      top: '10mm',
      bottom: '10mm',
      left: '10mm',
      right: '10mm',
    },
  });

  // Close browser
  await browser.close();
}

main().then();
