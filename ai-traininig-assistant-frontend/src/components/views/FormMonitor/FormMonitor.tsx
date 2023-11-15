import { useState, useRef } from 'react';
import * as ml5 from 'ml5';
import { Alert, AlertTitle, Container, IconButton, Paper } from '@mui/material';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import Sketch from 'react-p5';

import {
  calculatedDistanceFromTheCamera,
  checkConfidenceLevel,
  drawKeypoints,
  drawSkeleton,
} from './utils/poseDetection';

export default function FormMonitor() {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');
  const poseRef = useRef(null);
  const skeletonRef = useRef(null);

  function gotPoses(poses) {
    if (poses.length > 0) {
      poseRef.current = poses[0].pose;
      skeletonRef.current = poses[0].skeleton;
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = p5.createCapture(p5.VIDEO);
        videoElement.elt.srcObject = stream;
        videoElement.hide();
        setVideo(videoElement);

        const poseNet = ml5.poseNet(videoElement, () =>
          console.log('Model loaded')
        );

        poseNet.on('pose', gotPoses);
      })
      .catch((err) => {
        console.error('Failed to access the camera:', err);
        setError(`Failed to access the camera: ${err.message}`);
      });
  };

  const draw = (p5) => {
    if (video) {
      p5.image(video, 0, 0);
      const currentPose = poseRef.current;
      const currentSkeleton = skeletonRef.current;

      const CONFIDENCE_LEVEL = 0.8;

      if (currentPose) {
        checkConfidenceLevel(currentPose, CONFIDENCE_LEVEL);

        const distance = calculatedDistanceFromTheCamera(currentPose, p5);

        Object.keys(currentPose).forEach((keypoint) => {
          drawKeypoints(currentPose, keypoint, p5, distance);
        });

        if (currentSkeleton) {
          drawSkeleton(currentSkeleton, p5);
        }
      }
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        margin: {
          xs: '6rem 1rem',
          padding: '1rem',
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        minWidth: { xl: '490px', xs: '290px' },
      }}
    >
      {error && (
        <Container
          sx={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Container>
      )}
      {error ? (
        <IconButton disabled>
          <NoPhotographyIcon
            sx={{
              height: '340px',
              width: '280px',
            }}
          />
        </IconButton>
      ) : (
        <Sketch setup={setup} draw={draw} />
      )}
    </Paper>
    // </Container>
  );
}
