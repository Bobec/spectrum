import { faceapi } from "face-api.js"
import { canvas } from "canvas"
import { fs } from "fs"
import { path } from "path"
import { fetch } from "node-fetch"

export default async (req, res) => {
    res.statusCode = 200
    const MODELS_URL = '/static/models'
    
    res.json({"hello": MODELS_URL})
}