import puppeteer from 'puppeteer';
import { pageExtend } from 'puppeteer-jquery';

export class GetFics {
  async getFictions(
    title: string,
    author: string,
    summary: string,
    filterTags: string[],
    fandom: string
  ) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const pageJQ = pageExtend(page);
    const preliminary = 'https://api.scrapingant.com/v2/general?url=https%3A%2F%2Fwww.fanfiction.net%2Fsearch%2F%3Fpopup%3D1&x-api-key=bd4440017cdc4e33b2f925244fb3296c';
    await pageJQ.goto(preliminary);

    const e = await pageJQ.jQuery("#pcategoryid > option:contains('Cartoons')").attr("value");

    console.log("The fandom id is", e);

    const fnurl = `https://www.fanfiction.net/search/?keywords=Fire+Nation&type=story&match=any&formatid=any&sort=0&genreid1=0&genreid2=0&characterid1=0&characterid2=0&characterid3=0&characterid4=0&words=0&ready=1&categoryid=2002#`;

    const ao3url = `https://archiveofourown.org/works/search?commit=Search&work_search%5Bquery%5D=` +
    `${summary ?? ""}&work_search%5Btitle%5D=` +
    `${title ?? ""}&work_search%5Bcreators%5D=` +
    `${author ?? ""}&work_search%5Brevised_at%5D=&work_search%5Bcomplete%5D=&work_search%5Bcrossover%5D=&work_search%5Bsingle_chapter%5D=0&work_search%5Bword_count%5D=&work_search%5Blanguage_id%5D=&work_search%5Bfandom_names%5D=` +
    `Avatar%3A+The+Last+Airbender&work_search%5Brating_ids%5D=&work_search%5Bcharacter_names%5D=Zuko+%28Avatar%29&work_search%5Brelationship_names%5D=&work_search%5Bfreeform_names%5D=` +
    `${filterTags?.join(",")??""}&work_search%5Bhits%5D=&work_search%5Bkudos_count%5D=&work_search%5Bcomments_count%5D=&work_search%5Bbookmarks_count%5D=&work_search%5Bsort_column%5D=_score&work_search%5Bsort_direction%5D=desc`;

    await page.goto(ao3url);
    const nodes = await page.$$("li[role='article']");
    let fics = [];
    for (let node of nodes) {
      try {
        let id = await (await node.getProperty('id')).jsonValue();
        var heading = await page.$$(`#${id} > div > h4 > a`);
        var name = await (
          await heading[0].getProperty('textContent')
        ).jsonValue();

        if (heading.length == 2) {
          var creator = await (
            await heading[1].getProperty('textContent')
          ).jsonValue();
        } else {
          let creator = 'Anonymous';
        }

        var sumsec = await page.$$(`#${id} > blockquote > p`);
        let sum = '';
        var tags = await page.$$(`#${id} > ul > li > a`);
        let ftags = [];

        for (let tag of tags) {
          const tagName = await (
            await tag.getProperty('textContent')
          ).jsonValue();
          ftags.push(tagName);
        }

        for (let s of sumsec) {
          const sText = await (await s.getProperty('textContent')).jsonValue();
          sum += sText;
        }

        let fanfiction = {
          title: name,
          author: creator!,
          tags: ftags,
          summary: sum,
        };
        fics.push(fanfiction);
      } catch (Exception) {}
    }
    await browser.close();
    return fics;
  }
}
