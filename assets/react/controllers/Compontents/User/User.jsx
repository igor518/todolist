import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './index.css';

/**
 * Retrieves user data
 *
 * @type {DocumentNode}
 */
const GET_USER = gql`
    query getUser ($id: ID!) {
        user(id: $id) {
            id
            firstname
            lastname
            email
        }
    }
`;


/**
 * Get user data from
 * server
 *
 * @param user
 * @returns {Element}
 * @constructor
 */
function DisplayUser({ userId }) {
    const { loading, error, data } = useQuery(GET_USER,{
        variables: { id: `/api/users/${userId}` },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div className="@container" key={data.user.id}>
            <div className="grid grid-cols-1 @sm:grid-cols-2">
                <ul>
                    <li>{data.user.firstname}</li>
                    <li>{data.user.lastname}</li>
                    <li>{data.user.email}</li>
                </ul>
            </div>
        </div>
    );
}
export default function UserRequest({userId}) {
    return (
        <div>
            <DisplayUser userId={userId}/>
        </div>
    );
}
