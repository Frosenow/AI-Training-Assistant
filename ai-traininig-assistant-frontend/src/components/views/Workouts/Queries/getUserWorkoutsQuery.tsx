/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FETCH_USER_WORKOUTS_QUERY = gql`
  query getUserWorkouts($owner: String!) {
    getUserWorkouts(owner: $owner) {
      owner
      createdAt
      id
      name
      workoutSplit {
        monday {
          exerciseName
          muscleGroup
          reps
          sets
          progressTracker {
            trainingDate
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
        }
        wednesday {
          exerciseName
          muscleGroup
          reps
          sets
        }
        thursday {
          exerciseName
          muscleGroup
          reps
          sets
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
        }
        sunday {
          exerciseName
          muscleGroup
          reps
          sets
        }
      }
    }
  }
`;
