import { useState, useRef, useEffect } from 'react';
import * as ml5 from 'ml5';
import { Alert, AlertTitle, Container, IconButton, Paper } from '@mui/material';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import Sketch from 'react-p5';
import { ApolloError } from '@apollo/client';

import {
  calculatedDistanceFromTheCamera,
  checkConfidenceLevel,
  drawKeypoints,
  drawSkeleton,
} from './utils/poseDetection';
import SnackBarError from '../../SnackBarError/SnackBarError';

interface ErrorState {
  cameraAllowed?: ApolloError | null;
  detectedKeypoints?: ApolloError | null;
}

export default function FormMonitor() {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState<ErrorState>({
    cameraAllowed: null,
    detectedKeypoints: null,
  });
  const [checkAllKeypoints, setCheckAllKeypoints] = useState(false);
  const poseRef = useRef(null);
  const skeletonRef = useRef(null);

  useEffect(() => {
    if (!checkAllKeypoints) {
      setError((prevError) => ({
        ...prevError,
        detectedKeypoints: new ApolloError({
          errorMessage: `In order to correctly detect pose, all joints should be visible in the camera.`,
        }),
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        detectedKeypoints: null,
      }));
    }
  }, [checkAllKeypoints]);

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
        setError((prevError) => ({
          ...prevError,
          cameraAllowed: new ApolloError({
            errorMessage: `Failed to access the camera: ${err.message}`,
          }),
        }));
      });
  };

  console.log(error);

  const draw = (p5) => {
    if (video) {
      p5.image(video, 0, 0);
      const currentPose = poseRef.current;
      const currentSkeleton = skeletonRef.current;

      const CONFIDENCE_LEVEL = 0.6;

      if (currentPose) {
        setCheckAllKeypoints(
          checkConfidenceLevel(currentPose, CONFIDENCE_LEVEL)
        );

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
      {error.cameraAllowed ? (
        <Container
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error.cameraAllowed.message}
          </Alert>
          <IconButton disabled>
            <NoPhotographyIcon
              sx={{
                height: '340px',
                width: '280px',
              }}
            />
          </IconButton>
        </Container>
      ) : (
        <>
          <Sketch setup={setup} draw={draw} />
          {error.detectedKeypoints && (
            <SnackBarError error={error.detectedKeypoints} />
          )}
        </>
      )}
    </Paper>
  );
}
