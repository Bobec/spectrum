var express = require("express");
const faceapi = require("face-api.js")  
const canvas = require("canvas")  
const fs = require("fs")  
const path = require("path")
const fetch = require('node-fetch');

var router = express.Router();


// mokey pathing the faceapi canvas
const { Canvas, Image, ImageData } = canvas  
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
faceapi.env.monkeyPatch({ fetch: fetch });


/* GET home page. */
router.post("/", async function (req, res, next) {
    
    // load weights
    const MODELS_URL ='./public/models';
    // console.log("get faceapi")
    // var img = new Canvas.Image; // Create a new Image
    // img.src = req.body.base64;
    req.body.base64 = req.body.base64.replace(/^data:image\/jpeg+;base64,/, "");
    req.body.base64 = req.body.base64.replace(/ /g, '+');

    await fs.writeFile('./out.jpeg', req.body.base64, 'base64', function(err) {
        console.log(err);
    });

    const referenceImage = await canvas.loadImage('./out.jpeg')

    await faceapi.nets.faceLandmark68Net  .loadFromDisk   (MODELS_URL)
    await faceapi.nets.faceRecognitionNet .loadFromDisk   (MODELS_URL)
    await faceapi.nets.faceExpressionNet  .loadFromDisk   (MODELS_URL)
    await faceapi.nets.ssdMobilenetv1     .loadFromDisk   (MODELS_URL)

    console.log(req.body.base64)
    const detectionsWithExpressions = await faceapi.detectAllFaces(referenceImage).withFaceLandmarks().withFaceExpressions()

    console.log(detectionsWithExpressions)

    res.json({"goti": 'asta'})

    // // // // // // // save the new canvas as image
    // // // // //  console.log(detectionsWithExpressions[0].expressions)
    // // // // // // saveFile('faceLandmarkDetection.jpg', out.toBuffer('image/jpeg'))
    // // // // // // console.log('done, saved results to out/faceLandmarkDetection.jpg')
    
    // console.log(detectionsWithExpressions[0].expressions)
    // res.json(detectionsWithExpressions[0].expressions)
    // // res.json({"hello": MODELS_URL})
    // res.end()

});

module.exports = router;
