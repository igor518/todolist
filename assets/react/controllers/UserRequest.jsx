import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
function DisplayUser(user) {
        const { loading, error, data } = useQuery(GET_USER,{
        variables: { id: `/api/users/${user.userId}` },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <div key={data.user.id}>
            <h2>{data.user.firstname}</h2>
            <h2>{data.user.lastname}</h2>
            <h2>{data.user.email}</h2>
            <br/>
        </div>
    );
}

export default function UserRequest({userId}) {
    return (
        <div>
            <DisplayUser userId={userId} />
        </div>
    );
}
