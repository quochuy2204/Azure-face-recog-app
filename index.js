require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const path= require('path');
const app = express();

//install cors
const cors= require('cors');

app.use(cors());
app.use(express.json());

// API key from Azure
const ApiKey = "d9277e9b487b4a40b026814d591ffcca"
// Azure endpoint URL - Face API
const AzureEndpoint = `https://northeurope.api.cognitive.microsoft.com/face/v1.0`
const AzureEndpoint2 = `https://quochuy-computervision.cognitiveservices.azure.com/`

// Base instance for axios request
const baseInstanceOptions = {
  baseURL: AzureEndpoint,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': "d9277e9b487b4a40b026814d591ffcca"
  }
}

const baseInstanceOptions2 = {
  baseURL: AzureEndpoint2,
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': "1db0ed545a25491abdebe3ba762b09a2"
  }
}

// body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Allow cors middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()

  app.options('*', (res, req) => {
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS')
  })
})

app.post('/create-facelist', async (req, res) => {
  try {
    const instanceOptions = {...baseInstanceOptions}
    const instance = axios.create(instanceOptions)
    const body = req.body

    const response = await instance.post(
      `https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender,emotion,glasses,hair,smile`,
      {
        url: body.image
      }
    )
    res.send({
      response: 'ok',
      data: response.data
    })
  } catch (err) {
    console.log("error :c : ", err)
    res.send({response: 'not ok'})
  }
})

app.post('/create-facelist2', async (req, res) => {
  try {
    const instanceOptions = {...baseInstanceOptions}
    const instance = axios.create(instanceOptions)
    const body = req.body

    const response = await instance.post(
      `https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender,emotion,glasses,hair,smile`,
      {
        url: body.image2
      }
    )
    res.send({
      response: 'ok',
      data: response.data
    })
  } catch (err) {
    console.log("error :c : ", err)
    res.send({response: 'not ok'})
  }
})

app.post('/create-facelist3', async (req, res) => {
  try {
    const instanceOptions = {...baseInstanceOptions}
    const instance = axios.create(instanceOptions)
    const body = req.body

    const response = await instance.post(
      `https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_01&returnRecognitionModel=false&detectionModel=detection_01&returnFaceAttributes=age,gender,emotion,glasses,hair,smile`,
      {
        url: body.image3
      }
    )
    res.send({
      response: 'ok',
      data: response.data
    })
  } catch (err) {
    console.log("error :c : ", err)
    res.send({response: 'not ok'})
  }
})

app.post('/create-facelist4', async (req, res) => {
  try {
    const instanceOptions = {...baseInstanceOptions}
    const instance = axios.create(instanceOptions)
    const body = req.body;
    console.log("bug there", body);

    const response = await instance.post(
      `https://northeurope.api.cognitive.microsoft.com/face/v1.0/verify`,
      {
        faceId1: body.faceID1,
        faceId2: body.faceID2
      }
    )
    res.send({
      response: 'ok',
      data: response.data
    })
  } catch (err) {
    console.log("error :c : ", err)
    res.send({response: 'not ok'})
  }
})

app.post('/create-facelist5', async (req, res) => {
  try {
    const instanceOptions = {...baseInstanceOptions2}
    const instance = axios.create(instanceOptions)
    const body = req.body;
    console.log("bug there", body);

    const response = await instance.post(
      `https://northeurope.api.cognitive.microsoft.com/vision/v2.0/analyze?visualFeatures=Description&details=Landmarks&language=en`,
      {
        url: body.image4
      }
    )
    res.send({
      response: 'ok',
      data: response.data
    })
  } catch (err) {
    console.log("error :c : ", err)
    res.send({response: 'not ok'})
  }
})

// Create server
const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on ports ${PORT}`)
  }
})