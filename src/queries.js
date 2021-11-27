import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      token
      email
      role
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
