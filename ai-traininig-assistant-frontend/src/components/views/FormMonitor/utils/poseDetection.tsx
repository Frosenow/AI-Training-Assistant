import { notUsedKeypoints } from '../consts/notUsedKeypoints';

export function calculatedDistanceFromTheCamera(currentPose, p5) {
  const eyeR = currentPose.rightEye;
  const eyeL = currentPose.leftEye;

  const distance = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
  return distance;
}

export function drawKeypoints(currentPose, keypoint, p5, distance) {
  if (!notUsedKeypoints.includes(keypoint)) {
    const { x } = currentPose[keypoint];
    const { y } = currentPose[keypoint];

    p5.fill(0, 255, 0);
    p5.ellipse(x, y, distance);
  }
}

export function drawSkeleton(currentSkeleton, p5) {
  currentSkeleton.forEach((skeleton) => {
    const [a, b] = skeleton;

    p5.strokeWeight(2);
    p5.stroke(255);
    p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
  });
}

export function checkConfidenceLevel(currentPose, CONFIDENCE_LEVEL) {
  const keypointsArr = [];

  Object.keys(currentPose).forEach((keypoint) => {
    if (!notUsedKeypoints.includes(keypoint)) {
      if (currentPose[keypoint].confidence >= CONFIDENCE_LEVEL) {
        keypointsArr.push({
          pose: currentPose[keypoint],
          posename: keypoint,
        });
      }
    }
  });

  // If all keypoints pass the confidence level
  // There is 12 keypoints
  return keypointsArr.length >= 12;
}
