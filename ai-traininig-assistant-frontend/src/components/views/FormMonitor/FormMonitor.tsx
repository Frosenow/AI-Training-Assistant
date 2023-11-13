import { useState } from 'react';
import { Alert, AlertTitle, Container } from '@mui/material';
import Sketch from 'react-p5';

export default function FormMonitor() {
  const [video, setVideo] = useState(null);
  const [error, setError] = useState('');

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        const videoElement = p5.createCapture(p5.VIDEO);
        videoElement.elt.srcObject = stream;
        videoElement.hide();
        setVideo(videoElement);
      })
      .catch((err) => {
        console.error('Failed to access the camera:', err);
        setError(`Failed to access the camera: ${err.message}`);
      });
  };

  const draw = (p5) => {
    if (video) {
      p5.image(video, 0, 0);
    }
  };

  return (
    <Container
      sx={{
        width: '80%',
        overflow: 'hidden',
        margin: {
          xs: '6rem 1rem',
          sm: '6rem 1rem 1rem calc(1rem + 239px)',
        },
      }}
    >
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Sketch setup={setup} draw={draw} />
    </Container>
  );
}
