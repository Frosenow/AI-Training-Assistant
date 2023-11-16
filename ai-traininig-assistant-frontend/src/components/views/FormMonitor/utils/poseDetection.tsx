/* eslint-disable no-param-reassign */
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

    p5.fill(13, 12, 27);
    p5.ellipse(x, y, distance);
  }
}

export function drawSkeleton(currentSkeleton, p5) {
  currentSkeleton.forEach((skeleton) => {
    const [a, b] = skeleton;

    p5.strokeWeight(2);
    p5.stroke(145, 242, 225);
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
  return keypointsArr.length >= 5;
}

function normalizeAngle(angle) {
  // Normalize the angle to 0 - 180 range
  if (angle < 0) {
    // eslint-disable-next-line no-param-reassign
    angle += 360;
  }
  if (angle > 180) {
    // eslint-disable-next-line no-param-reassign
    angle = 360 - angle;
  }

  return angle;
}

export function calculateAngleBetweenJoints(jointA, jointB, jointC, p5) {
  const angle = p5.degrees(
    p5.atan2(jointA.y - jointB.y, jointA.x - jointB.x) -
      p5.atan2(jointC.y - jointB.y, jointC.x - jointB.x)
  );

  return normalizeAngle(angle);
}

export function checkConfidenceLevelOfJoints(joints, CONFIDENCE_LEVEL) {
  const jointsArr = [];

  joints.forEach((joint) => {
    if (joint.confidence >= CONFIDENCE_LEVEL) {
      jointsArr.push(joint);
    }
  });

  // Check if all joints are correctly detected
  return jointsArr.length === joints.length;
}

function analyzeMovement(buffer, MOVEMENT_THRESHOLD) {
  // Here, you might analyze if the buffer shows a full range of motion
  // For simplicity, let's say we check for a complete increase and decrease in angle
  const minAngle = Math.min(...buffer);
  const maxAngle = Math.max(...buffer);
  return maxAngle - minAngle > MOVEMENT_THRESHOLD; // Example threshold
}

function runRepsCalculation(
  bodyPart,
  bufferName,
  musclesBuffer,
  extendedRef,
  MOVEMENT_THRESHOLD,
  setReps,
  p5
) {
  const angle = calculateAngleBetweenJoints(...bodyPart, p5);

  // Update the buffer for the specific body part
  musclesBuffer.current[bufferName].push(angle);
  musclesBuffer.current[bufferName].shift();

  // Analyze the buffer for significant movement
  if (analyzeMovement(musclesBuffer.current[bufferName], MOVEMENT_THRESHOLD)) {
    if (angle > 90) {
      extendedRef.current[bufferName] = true;
    } else if (angle < 90 && extendedRef.current[bufferName]) {
      setReps((previousReps) => previousReps + 1);
      extendedRef.current[bufferName] = false; // Reset the flag
    }
  }
}

export function calculateReps(
  currentPose,
  CONFIDENCE_LEVEL,
  MOVEMENT_THRESHOLD,
  p5,
  musclesBuffer,
  extendedRef,
  setReps
) {
  if (checkConfidenceLevel(currentPose, CONFIDENCE_LEVEL)) {
    const leftArm = [
      currentPose.leftShoulder,
      currentPose.leftElbow,
      currentPose.leftWrist,
    ];
    const rightArm = [
      currentPose.rightShoulder,
      currentPose.rightElbow,
      currentPose.rightWrist,
    ];
    const leftLeg = [
      currentPose.leftHip,
      currentPose.leftKnee,
      currentPose.leftAnkle,
    ];
    const rightLeg = [
      currentPose.rightHip,
      currentPose.rightKnee,
      currentPose.rightAnkle,
    ];

    runRepsCalculation(
      leftArm,
      'leftArm',
      musclesBuffer,
      extendedRef,
      MOVEMENT_THRESHOLD,
      setReps,
      p5
    );
  }
}
