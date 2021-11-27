import { gql } from '@apollo/client'


export const GET_ALL_ASSESSMENTS = gql`
  query {
    getAllAssessments {
        score
        status
    }
  }
`