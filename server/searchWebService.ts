import puppeteer from "puppeteer";

export class getFics {
  async getFictions () {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://archiveofourown.org/tags/Avatar:%20The%20Last%20Airbender/works');
      const nodes = await page.$$("li[role='article']");
      let fics = [];
      for (let node of nodes) {
        try
        {
            let id = await (await node.getProperty('id')).jsonValue()
            var heading = await page.$$(`#${id} > div > h4 > a`);
            var name = await (await heading[0].getProperty('textContent')).jsonValue();

            if (heading.length == 2) {
                var creator = await (await heading[1].getProperty('textContent')).jsonValue();
            }
            else {
                let creator = "Anonymous";
            }

            var sumsec = await page.$$(`#${id} > blockquote > p`);
            let sum = "";
            var tags = await page.$$(`#${id} > ul > li > a`);
            let ftags = [];

            for (let tag of tags) {
                const tagName = await (await tag.getProperty('textContent')).jsonValue();
                ftags.push(tagName);
            }

            for (let s of sumsec) {
                const sText = await (await s.getProperty('textContent')).jsonValue();
                sum += sText;
            }

            let fanfiction = {title: name, author: creator!, tags: ftags, summary: sum};
            fics.push(fanfiction);
        }
        catch (Exception)
        {

        }
      }
      await browser.close();
      return fics;
  };
}
