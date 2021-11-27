import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      token
      email
      role
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $name: String!) {
    createUser(name: $name, email: $email, password: $password) {
      id
      email
      role
    }
  }
`

export const ME = gql`
  query ME {
    me {
      name
    }
  }
`

export const GET_TEST = gql`
  query GetTests($testId: String) {
    getAllTests(testId: $testId) {
      id
      name
      skills {
        id
        questions {
          type
          id
          title
          options
        }
        name
        description
      }
      testId
    }
  }
`

export const START_ASSESSMENT = gql`
  mutation createAssessment($status: Status!, $testId: ID!, $userId: ID!) {
    createAssessment(status: $status, testId: $testId, userId: $userId) {
      status
      id
    }
  }
`

export const SUBMIT_ANSWERS = gql`
  mutation editAssessment(
    $status: Status!
    $id: ID!
    $userInput: [UserInput!]
  ) {
    editAssessment(status: $status, id: $id, userInput: $userInput) {
      status
    }
  }
`
