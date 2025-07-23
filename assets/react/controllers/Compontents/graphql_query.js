import { gql } from '@apollo/client';

/**
 * GraphQL mutation to create a new task list.
 *
 * This mutation accepts an input object of type `createTaskListInput` and returns
 * a task list object containing its ID, name, description, creation timestamp,
 * and update timestamp.
 *
 * Variables:
 * - input: An object of type `createTaskListInput` containing the required details
 *   to create the task list.
 *
 * Returns:
 * - A task list object that contains the following properties:
 *   - id: The unique identifier of the created task list.
 *   - name: The name of the task list.
 *   - description: A description of the task list.
 *   - created_at: The timestamp when the task list was created.
 *   - updated_at: The timestamp when the task list was last updated.
 */
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

/**
 * GraphQL query for fetching task lists based on the provided parameters.
 *
 * The `GET_TASK_LISTS` query retrieves a list of task lists owned by a specific user.
 * It supports pagination by accepting a `first` parameter to limit the number of results returned.
 *
 * @constant {DocumentNode} GET_TASK_LISTS
 * @param {Int!} first - The maximum number of task lists to fetch.
 * @param {String!} owner - The owner of the task lists to be fetched.
 * @returns {Object} taskLists - Contains the fetched task list data.
 * @returns {Array} taskLists.edges - Array of edges containing task list nodes.
 * @returns {Object} taskLists.edges.node - Individual task list node data.
 * @returns {ID} taskLists.edges.node.id - The unique identifier of the task list.
 * @returns {String} taskLists.edges.node.name - The name of the task list.
 * @returns*/
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
          dueDate
        }
      }
    }
  }
`;

/**
 * Mutation for creating a new task.
 *
 * This GraphQL mutation takes an input argument of type `createTaskInput`
 * and creates a task with the provided details. The mutation returns the
 * details of the created task, including its ID, title, description, and
 * status.
 *
 * @constant {DocumentNode} CREATE_TASK
 * Represents the GraphQL mutation for creating a task.
 * @param {createTaskInput} input The input object containing the necessary fields for a task creation request.
 * @returns {Object} Returns the created task's information including:
 *  - id: The unique identifier of the created task.
 *  - title: The title of the created task.
 *  - description: The description of the created task.
 *  - status: The status of the created task.
 */
export const CREATE_TASK = gql`
  mutation createTask($input: createTaskInput!) {
    createTask(input: $input) {
      task {
        id
        title
        description
        status
        assigned_user {
           firstname
           lastname
        }
      }
    }
  }
`;

/**
 * A GraphQL mutation query for deleting a task list.
 *
 * DELETE_TASK is a GraphQL mutation string that deletes a specified task list based on the input provided.
 * It requires an input variable of type `deleteTaskListInput` to specify the task list to be deleted.
 * Upon successful execution, it returns the ID of the deleted task list.
 */
export const DELETE_TASK = gql`
  mutation deleteTask($input: deleteTaskInput!) {
    deleteTask(input: $input) {
      task {
        id
      }
    }
   }
`;

/**
 * GraphQL mutation for updating a task.
 * Used for updating task properties including status.
 */
export const UPDATE_TASK = gql`
  mutation updateTask($input: updateTaskInput!) {
    updateTask(input: $input) {
      task {
        id
        title
        description
        status
        progress
        dueDate
      }
    }
  }
`;

/**
 * GraphQL query to retrieve user information based on a specified user ID.
 * This query accepts an ID as a parameter and returns the user's details.
 * It fetches the following fields: id, firstname, lastname, and email.
 *
 * Variable:
 * - id (ID!): The unique identifier of the user to be fetched.
 *
 * Returns:
 * - user: An object containing user details.
 *   - id (String): Unique identifier of the user.
 *   - firstname (String): First name of the user.
 *   - lastname (String): Last name of the user.
 *   - email (String): Email address of the user.
 */
export const GET_USER = gql`
    query getUser ($id: ID!) {
        user(id: $id) {
            id
            firstname
            lastname
            email
        }
    }
`;
