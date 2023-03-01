import { Request, Response } from "express"
import path from "path"
import { getFics } from "./searchWebService"

const express = require("express")
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(express.static(path.join(__dirname, "..", "dist", "fanfiction-search")))

app.get('/getFictions', async(req:Request, res:Response) => {
  const fic = new getFics();
  const fics = await fic.getFictions();
  res.send(fics);
})
