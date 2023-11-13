import Sketch from 'react-p5';

export default function FormMonitor() {
  let video;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(640, 480).parent(canvasParentRef);

    // Request access to the video
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video = p5.createCapture(p5.VIDEO);
        video.elt.srcObject = stream;
        video.hide();
      })
      .catch((err) => {
        console.error('Failed to access the camera:', err);
        // Optionally, handle the error in the UI
      });
  };

  const draw = (p5) => {
    if (video) {
      p5.image(video, 0, 0);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
}
