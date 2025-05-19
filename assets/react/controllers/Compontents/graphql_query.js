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
export const DELETE_TASK_LIST = gql`
  mutation deleteTaskList($input: deleteTaskListInput!) {
    deleteTaskList(input: $input) {
      taskList {
        id
      }
    }
   }
`;

/**
 * GraphQL query for fetching task lists with specific filters.
 *
 * This query fetches a paginated list of task lists that belong to a specific owner.
 * The response includes the `id`, `name`, and `description` of each task list.
 *
 * Variables:
 * @param {number} first - The maximum number of task lists to retrieve.
 * @param {string} owner - The owner of the task lists to filter by.
 *
 * Query Structure:
 * - Retrieves `edges` containing a `node` for each task list.
 * - Each `node` will have the following fields:
 *   - `id`: Unique identifier of the task list.
 *   - `name`: Name of the task list.
 *   - `description`: Description of the task list.
 */
export const GET_TASKS = gql`
  query GetTasks ($first: Int!, $taskList: String!) {
    tasks(first:$first, task_list:$taskList) {
      edges {
        node {
          id
          title
          description
          status
          progress
        }
      }
    }
  }
`;