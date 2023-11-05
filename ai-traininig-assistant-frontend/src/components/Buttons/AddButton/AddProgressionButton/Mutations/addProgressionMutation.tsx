/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const ADD_PROGRESSION_MUTATION = gql`
  mutation addProgression(
    $workoutPlanId: ID!
    $exerciseId: ID!
    $progression: ProgressionInput!
  ) {
    addProgression(
      workoutPlanId: $workoutPlanId
      exerciseId: $exerciseId
      progression: $progression
    ) {
      id
      workoutSplit {
        friday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        monday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        saturday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        sunday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        thursday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        tuesday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
        wednesday {
          id
          progressTracker {
            id
            trainingDate
            progression {
              reps
              sets
              weight
              volume
            }
          }
        }
      }
    }
  }
`;
