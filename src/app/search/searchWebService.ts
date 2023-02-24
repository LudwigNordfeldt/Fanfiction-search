import puppeteer from "puppeteer";
import { Fic } from "./search.component";

export class getFics {
  async getFictions () {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://archiveofourown.org/tags/Avatar:%20The%20Last%20Airbender/works');
      const nodes = await page.$$("//*[@id=\"main\"]/ol/*");
      //let id = await page.$$eval("input", nodes => nodes.map(element => element.id));
      let fics = [];
      for (let node of nodes) {
        try
        {
            let id = await (await node.getProperty('id')).jsonValue()
            var heading = await node.$$(`//*[@id=${id}]//h4/a`);
            const name = await (await heading[0].getProperty('textContent')).jsonValue()
            var sumsec = await node.$$(`//*[@id=${id}]/blockquote`);
            const fsummary = await (await sumsec[0].getProperty('textContent')).jsonValue()
            let ftags = [];
            if (heading.length == 2)
            {
                var creator = await (await heading[1].getProperty('textContent')).jsonValue()
            }
            else
            {
                let creator = "Anonymous";
            }
            var Tags = await node.$$(`//*[@id=${id}]/ul/li//a`);
            for (let Tag of Tags)
            {
                const tag = await (await Tag.getProperty('textContent')).jsonValue()
                ftags.push(tag!);
            }
            let fanfiction:Fic = {title: name!, author: creator!, tags: ftags, summary: fsummary!};
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
