import { gql } from '@apollo/client'


export const GET_ALL_ASSESSMENTS = gql`
  query {
    getAllAssessments {
        score
        status
        test{
            id
            name
            skills{
                name
            }
            testId
        }
        user{
            id
            name
            email
            role
        }
    }
  }
`

export const GET_ALL_TESTS = gql`
  query {
    getAllTests {
            id
            name
            skills{
                name
            }
            testId
    }
  }
`