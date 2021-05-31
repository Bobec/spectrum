var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/", async function (req, res, next) {
    
    // load weights
    const MODELS_URL ='./public/models';
    console.log("get faceapi")
        console.log("here in post")
        await faceapi.nets.faceLandmark68Net  .loadFromDisk   (MODELS_URL)
        await faceapi.nets.faceRecognitionNet .loadFromDisk   (MODELS_URL)
        await faceapi.nets.faceExpressionNet  .loadFromDisk   (MODELS_URL)
        await faceapi.nets.ssdMobilenetv1     .loadFromDisk   (MODELS_URL)

        console.log(req.body.base64)
        const detectionsWithExpressions = await faceapi.detectAllFaces(req.body.base64).withFaceLandmarks().withFaceExpressions()

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
