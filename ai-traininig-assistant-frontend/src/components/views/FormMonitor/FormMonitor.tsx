import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ml5 from 'ml5';
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
} from '@mui/material';
import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import Sketch from 'react-p5';
import { ApolloError } from '@apollo/client';

import {
  calculateReps,
  calculatedDistanceFromTheCamera,
  checkConfidenceLevel,
  drawKeypoints,
  drawSkeleton,
} from './utils/poseDetection';
import SnackBarFormDetectionError from '../../SnackBarError/SnackBarFormDetectionError';
import { AuthContext } from '../../../context/auth';

interface ErrorState {
  cameraAllowed?: ApolloError | null;
  detectedKeypoints?: ApolloError | null;
}

export default function FormMonitor() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [error, setError] = useState<ErrorState>({
    cameraAllowed: null,
    detectedKeypoints: null,
  });
  const [checkAllKeypoints, setCheckAllKeypoints] = useState(false);
  const [reps, setReps] = useState(0);
  const poseRef = useRef(null);
  const skeletonRef = useRef(null);
  const extendedRef = useRef({
    leftArm: false,
    rightArm: false,
    leftLeg: false,
    rightLeg: false,
  });
  const musclesBuffer = useRef({
    leftArm: Array(10).fill(null),
    rightArm: Array(10).fill(null),
    leftLeg: Array(10).fill(null),
    rightLeg: Array(10).fill(null),
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
    const constraints = {
      video: {
        facingMode: 'environment', // Use the selected camera type
      },
      audio: false, // Assuming you don't need audio for this
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const videoElement = p5.createCapture(p5.VIDEO);
        videoElement.elt.srcObject = stream;
        videoElement.hide();

        videoElement.elt.onloadedmetadata = () => {
          // Get the video dimensions
          const videoWidth = videoElement.width;
          const videoHeight = videoElement.height;

          const aspectRatio = videoWidth / videoHeight;
          const maxWidth = window.innerWidth;
          const maxHeight = window.innerHeight;

          // Slightly reduce canvas width to account for padding/margins
          const canvasWidth =
            Math.min(maxWidth, maxHeight * aspectRatio) * 0.95;

          const canvasHeight = canvasWidth / aspectRatio;

          // Calculate scale for videoElement
          const videoScale = Math.min(
            canvasWidth / videoElement.width,
            canvasHeight / videoElement.height
          );
          const scaledVideoWidth = videoElement.width * videoScale;
          const scaledVideoHeight = videoElement.height * videoScale;

          // Apply the calculated scale to videoElement
          videoElement.size(scaledVideoWidth, scaledVideoHeight);

          // Now set the video state with the scaled videoElement
          setVideo(videoElement);

          p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
        };

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

  const draw = (p5) => {
    if (video) {
      p5.translate(video.width, 0);
      p5.scale(-1, 1);
      p5.image(video, 0, 0, video.width, video.height);
      const currentPose = poseRef.current;
      const currentSkeleton = skeletonRef.current;

      const CONFIDENCE_LEVEL = 0.5;

      if (currentPose) {
        const confidenceLevel = checkConfidenceLevel(
          currentPose,
          CONFIDENCE_LEVEL
        );

        setCheckAllKeypoints(confidenceLevel);

        // If correctly detected pose, run reps calculator
        if (confidenceLevel) {
          const MOVEMENT_THRESHOLD = 10;

          calculateReps(
            poseRef.current,
            CONFIDENCE_LEVEL,
            MOVEMENT_THRESHOLD,
            p5,
            musclesBuffer,
            extendedRef,
            setReps
          );
        }

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
        position: 'relative',
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
        <Stack>
          <Sketch setup={setup} draw={draw} />
          <Container
            sx={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              padding: '10px',
              opacity: '50%',
            }}
          >
            <Button variant="contained" color="secondary">
              Reps: {reps}
            </Button>
            <Button
              onClick={() => setReps(0)}
              variant="contained"
              color="secondary"
            >
              Reset Reps
            </Button>
          </Container>
          {error.detectedKeypoints && (
            <SnackBarFormDetectionError
              error={error.detectedKeypoints}
              open={!checkAllKeypoints}
            />
          )}
        </Stack>
      )}
    </Paper>
  );
}
