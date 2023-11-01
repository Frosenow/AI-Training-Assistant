/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const FETCH_WORKOUTS_QUERY = gql`
  query getWorkouts {
    getWorkouts {
      createdAt
      id
      name
      owner
      workoutSplit {
        friday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        monday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        tuesday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        wednesday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        thursday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        saturday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
        sunday {
          exerciseName
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              volume
              weight
            }
          }
        }
      }
    }
  }
`;
