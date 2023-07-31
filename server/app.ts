import { Request, Response } from "express"
import path from "path"
import { GetFics } from "./searchWebService"

const express = require("express")
const bodyParser = require('body-parser')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, "..", "dist", "fanfiction-search")))

app.post('/getFictions', async(req:Request, res:Response) => {
  let { FicTitle, FicAuthor, FicSummary, FicChars, FicRels, FicTags, Fandom, NumRes } = req.body;
  const fic = new GetFics();
  const fics = await fic.getFictions(FicTitle, FicAuthor, FicSummary, FicChars, FicRels, FicTags, Fandom, NumRes);
  res.send(fics);
})

app.get('/getFandoms', async(req:Request, res:Response) => {
  let {text} = req.query;
  const fic = new GetFics();
  const fandoms = await fic.getFandoms(text?.toString()??"");
  res.send(fandoms);
})

app.get('/getTags', async(req:Request, res:Response) => {
  let {text} = req.query;
  const fic = new GetFics();
  const tags = await fic.getTags(text?.toString()??"");
  res.send(tags);
})

app.get('/getChars', async(req:Request, res:Response) => {
  let {text} = req.query;
  const fic = new GetFics();
  const chars = await fic.getChars(text?.toString()??"");
  res.send(chars);
})

app.get('/getRels', async(req:Request, res:Response) => {
  let {text} = req.query;
  const fic = new GetFics();
  const rels = await fic.getRels(text?.toString()??"");
  res.send(rels);
})

app.get('/fanfiction', async(req:Request, res:Response) => {
  let {url} = req.query;
  const fic = new GetFics();
  const ficText = await fic.getFicText(url?.toString()??"");
  res.send(ficText);
})

app.get('*', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "fanfiction-search", "index.html"));
})
