import * as p5 from 'p5';
import * as faceapi from 'face-api.js';
import Button from '@mui/material/Button';
import { useState, useRef, useEffect } from 'react';
import './faceAuthentication.css';

function FaceAuthentication() {
    const [initializing, setInitializing] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
            setInitializing(true);
            Promise.all([
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), //heavier/accurate version of tiny face detector
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            ]).then(start());
        }
        loadModels();
    }, []);

    function startCamera() {
        navigator.mediaDevices
        .getUserMedia({ video: { width: 320, heigh: 240 } })
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    }

    function clickPhoto() {
        //CAN BE AVOIDED
        // const image_data_url = canvasRef.current.toDataURL('image/jpeg');
        // console.log(image_data_url);
        recognizeFaces();
    }

    async function recognizeFaces() {

        const labeledDescriptors = await loadLabeledImages();
        console.log(labeledDescriptors);
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7);
        
        const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
        faceapi.matchDimensions(canvasRef.current, displaySize);

        canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0, videoRef.current.width, videoRef.current.height);
    
        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(canvasRef.current).withFaceLandmarks().withFaceDescriptors();
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor);
            });
            results.forEach( (result, i) => {
                console.log('#### ' + results + " ####"); //if result matches with the name fetched, lessgooo, flag it and in the later parts disable the camera and pop the successful message
                const box = resizedDetections[i].detection.box;
                const drawBox = new faceapi.draw.DrawBox(box, {     label: result.toString() });
                drawBox.draw(canvasRef.current);
            });
        }, 100);
    }
    
    
    function loadLabeledImages() {
        const labels = ['Anshima Tayal', 'Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye' , 'Jim Rhodes', 'Thor','Tia Saxena', 'Tony Stark'];
        // const labels = ['Tia Saxena'] // for WebCam
        return Promise.all(
            labels.map(async (label)=>{
                const descriptions = []
                for(let i=1; i<=2; i++) {
                    const img = await faceapi.fetchImage(require(`../../labeled_images/${label}/${i}.jpg`));
                    // console.log(img);
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                    // console.log(label + i + JSON.stringify(detections))
                    descriptions.push(detections.descriptor)
                }
                console.log(label+' Faces Loaded | ');
                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        )
    }

    function start() {
        console.log('Models have been loaded successfully');   
    }


    return(
        <>
            <div className="main-heading-faceAuthentication">Face Authentication</div>
            <video className='photo' id="video" ref={videoRef} width="250" height="250" autoPlay></video>
            <canvas className='photo' id="canvas" ref={canvasRef} width="250" height="250"></canvas>  
            <Button style={{marginLeft: '1.5rem'}} className='btn-faceAuth' color="secondary" onClick={startCamera}> Start Camera </Button>
            <Button style={{marginLeft: '1.5rem'}} className='btn-faceAuth' onClick={clickPhoto} color="secondary"> Click Photo</Button>
        </>
    );
}

export default FaceAuthentication;