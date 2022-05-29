import React, { useRef, useEffect } from "react";
import * as cam from "@mediapipe/camera_utils";
import Webcam from "react-webcam";
import Button from '@mui/material/Button';
import { Pose } from "@mediapipe/pose";
import * as poseprop from "@mediapipe/pose";
// import LandmarkGrid from '@mediapipe/control_utils_3d';

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

import {useNavigate} from 'react-router-dom';
import Result from "../../pages/result/result.component";

function Bicepcurl() {
    const navigate = useNavigate();

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    // const landmarkRef = useRef(null);   
    // const connect = window.drawConnectors;
    var camera = null;
    let sets = 0, reps = 0;

    // to keep a counter track
    let leftCounter = 0;
    let set_counter = 0;
    let leftUp = false, leftDown = false;

    let rightCounter = 0;
    //let rightSet_counter = 0;
    let rightUp = false, rightDown = false;

    // keep a track of range of motion achieved
    let leftMaxAngle = 10;
    //let dayRange = 0;
    //let rangeforday = document.querySelector('.rangeforday');

    let rightMaxAngle = 10;

    function result() {
        console.log("result: set = " + sets + " and reps = " + reps);
        camera.stop();
        // navigate('/result');
        // return <Result/>
    }

    function angleBetweenArms(obj12, obj14, obj16, obj11, obj13, obj15) {

      const leftVector1 = [(obj14.x - obj12.x) , (obj14.y - obj12.y)];
      const leftVector2 = [(obj14.x - obj16.x) , (obj14.y - obj16.y)];
      const rightVector1 = [(obj13.x - obj11.x) , (obj13.y - obj11.y)];
      const rightVector2 = [(obj13.x - obj15.x) , (obj13.y - obj15.y)];

      const leftDot = leftVector1[0]*leftVector2[0] + leftVector1[1]*leftVector2[1];
      const leftMod_a = Math.sqrt(leftVector1[0]*leftVector1[0] + leftVector1[1]*leftVector1[1]);
      const leftMod_b = Math.sqrt(leftVector2[0]*leftVector2[0] + leftVector2[1]*leftVector2[1]);

      const rightDot = rightVector1[0]*rightVector2[0] + rightVector1[1]*rightVector2[1];
      const rightMod_a = Math.sqrt(rightVector1[0]*rightVector1[0] + rightVector1[1]*rightVector1[1]);
      const rightMod_b = Math.sqrt(rightVector2[0]*rightVector2[0] + rightVector2[1]*rightVector2[1]);

      const leftAngle =((Math.acos(leftDot/(leftMod_a*leftMod_b))*180)/3.14).toFixed(2);
        //   console.log(leftAngle);
      leftMaxAngle = Math.max(leftMaxAngle, leftAngle);

      const rightAngle =((Math.acos(rightDot/(rightMod_a*rightMod_b))*180)/3.14).toFixed(2);
        //   console.log(rightAngle);
      rightMaxAngle = Math.max(rightMaxAngle, rightAngle);

        if(leftAngle <= 25) {
          leftDown = true;
        }
         else if(leftAngle >= 130) {
          leftUp = true;
        }

        if(rightAngle <= 25) {
            rightDown = true;
        }
        else if(rightAngle >= 130) {
            rightUp = true;
        }

        if((leftUp === true && leftDown === true) && (rightUp === true && rightDown === true)) {
          if(leftUp === true && leftDown === true) {
            leftCounter += 1;
            leftUp = false;
            leftDown = false;
          }
          if(rightUp === true && rightDown === true) {
            rightCounter += 1;
            rightUp = false;
            rightDown = false;
          }
          if((leftCounter+rightCounter) % 4 === 0) {
            reps = (leftCounter+rightCounter)/4;

            // console.log(leftMaxAngle);
            // console.log(rightMaxAngle)
            //dayRange += leftMaxAngle;
            leftMaxAngle = 10;
            rightMaxAngle = 10;
          }
        }

        if((leftCounter+rightCounter)/4 === 5) {
          leftCounter = 0;
          rightCounter=0;
          reps = Math.trunc((leftCounter+rightCounter)/4);
          set_counter += 1;
          sets = set_counter;
        }
        // console.log(reps);
        // console.log(sets);
        return 0;
    }

    function onResults(results) {
        let rangeAchieved = angleBetweenArms(results.poseLandmarks[12], results.poseLandmarks[14], results.poseLandmarks[16], results.poseLandmarks[11], results.poseLandmarks[13], results.poseLandmarks[15]);
        // console.log(" Report Card for the day = " + rangeAchieved);
        try {
           
            const canvasElement = canvasRef.current;
            const canvasCtx = canvasElement.getContext('2d');
            
            canvasCtx.save();
            canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'source-in';
         
            canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'destination-atop';

            canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

            canvasCtx.globalCompositeOperation = 'source-over';
            drawConnectors(canvasCtx, results.poseLandmarks, poseprop.POSE_CONNECTIONS,
                { color: 'red', lineWidth: 1 });//line
                // drawLandmarks(canvasCtx, results.poseLandmarks,
                //     { color: 'red', lineWidth: 2 });//red

        } catch (error) {
            console.log("error in results image", error);
        }
    }
    useEffect(() => {
        const pose = new Pose({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
            },
        });

        pose.setOptions({
            modelComplexity: 1,
            smoothLandmarks: true,
            enableSegmentation: true,
            smoothSegmentation: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        pose.onResults(onResults);

        if (
            typeof webcamRef.current !== "undefined" &&
            webcamRef.current !== null
        ) {
            camera = new cam.Camera(webcamRef.current.video, {
                onFrame: async () => {
                    await pose.send({ image: webcamRef.current.video });
                },
                width: 640,
                height: 480,
            });
            camera.start();
        }
    }, []);
    return (
        <>
            
                <div>
                <canvas
                        ref={canvasRef}
                        className="output_canvas"
                        style={{
                            width: 640,
                            height: 820,
                        }}
                    ></canvas>
                    <Webcam
                        ref={webcamRef}
                        style={{
                            width: 640,
                            height: 600,
                            display:"none"
                        }}
                    />{" "}
                    
                </div>
        
            <div>Sets: {sets} Reps: {reps}</div>
            <Button className = 'exercise-btn' style={{marginLeft: '8rem', backgroundColor: '#882f88', color: 'white', fontSize: '1.5rem', padding: '1.2rem'}} onClick={result} color="secondary"> STOP EXERCISE</Button>

        </>
    );
}

export default Bicepcurl;
