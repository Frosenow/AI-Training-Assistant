/* eslint-disable import/prefer-default-export */
import { gql } from '@apollo/client';

export const DELETE_PROGRESSION_MUTATION = gql`
  mutation deleteProgression(
    $workoutPlanId: ID!
    $exerciseId: ID!
    $progressionId: ID!
    $trainingDay: String!
  ) {
    deleteProgression(
      workoutPlanId: $workoutPlanId
      exerciseId: $exerciseId
      progressionId: $progressionId
      trainingDay: $trainingDay
    ) {
      name
      id
      workoutSplit {
        friday {
          id
          progressTracker {
            id
          }
        }
        monday {
          id
          progressTracker {
            id
          }
        }
        saturday {
          id
          progressTracker {
            id
          }
        }
        sunday {
          id
          progressTracker {
            id
          }
        }
        thursday {
          id
          progressTracker {
            id
          }
        }
        tuesday {
          id
          progressTracker {
            id
          }
        }
        wednesday {
          id
          progressTracker {
            id
          }
        }
      }
    }
  }
`;
