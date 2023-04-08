import { Request, Response } from "express"
import path from "path"
import { GetFics } from "./searchWebService"

const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, "..", "dist", "fanfiction-search")))

app.post('/getFictions', async(req:Request, res:Response) => {
  let { FicTitle, FicAuthor, FicSummary, FicTags, Fandom } = req.body;
  const fic = new GetFics();
  const fics = await fic.getFictions(FicTitle, FicAuthor, FicSummary, FicTags, Fandom);
  res.send(fics);
})

app.get('*', async (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "dist", "fanfiction-search", "index.html"));
})
