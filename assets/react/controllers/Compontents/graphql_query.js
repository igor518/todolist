import { gql } from '@apollo/client';

// GraphQL Create the "Task List" Mutation
export const CREATE_TASKLIST = gql`
  mutation createTaskList($input: createTaskListInput!) {
    createTaskList(input: $input) {
      taskList {
        id
        name
        description
        created_at
        updated_at
      }
    }
  }
`;

// GraphQL retrieve task lists
export const GET_TASK_LISTS = gql`
  query GetTaskLists ($first: Int!, $owner: String!) {
    taskLists(first:$first, owner:$owner) {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
`;
