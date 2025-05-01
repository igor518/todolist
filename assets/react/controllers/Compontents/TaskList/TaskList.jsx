import React, { useState } from 'react';
import { useMutation, gql, useQuery } from '@apollo/client';

// Define your GraphQL query to fetch task lists
const GET_TASK_LISTS = gql`
  query GetTaskLists {
    taskLists() {
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

// GraphQL Mutation
const CREATE_TASKLIST = gql`
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

const TaskList = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [createTaskList] = useMutation(CREATE_TASKLIST);
    const { data, loading, error } = useQuery(GET_TASK_LISTS);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert('Name is required.');
            return;
        }

        try {
            await createTaskList({
                variables: {
                    input: {
                        name,
                        description,
                        owner: "api/users/" + props.userId,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    },
                },
                refetchQueries: [{ query: GET_TASK_LISTS }]
            });
            setName('');
            setDescription('');
        } catch (error) {
            console.error('GraphQL Error:', error.graphQLErrors);
            alert('Failed to create TaskList.');
        }
    };

    return (
        <>
            <ul>
                {data?.taskLists?.edges?.map((taskList) => (
                <li key={taskList.node.id}>
                    <p>
                        {taskList.node.name}
                    </p>
                    <p>
                        {taskList.node.description}
                    </p>
                </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    placeholder="Enter task list name"
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <textarea
                    value={description}
                    placeholder="Enter description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border rounded p-2"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    {loading ? 'Creating...' : 'Create TaskList'}
                </button>
            </form>
        </>
    );
};

export default TaskList;