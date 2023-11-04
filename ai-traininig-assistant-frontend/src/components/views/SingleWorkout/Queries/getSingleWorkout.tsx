/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FETCH_SINGLE_WORKOUT_QUERY = gql`
  query getSingleWorkout($workoutPlanId: ID!) {
    getWorkout(workoutPlanId: $workoutPlanId) {
      id
      name
      owner
      createdAt
      workoutSplit {
        monday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        tuesday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        wednesday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        thursday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        friday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        saturday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
        sunday {
          exerciseName
          muscleGroup
          reps
          sets
          id
          progressTracker {
            trainingDate
            id
            progression {
              volume
              reps
              sets
              weight
            }
          }
        }
      }
    }
  }
`;
