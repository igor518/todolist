import React from 'react';
import { useQuery, gql } from '@apollo/client';

/**
 * Retrieves user data
 *
 * @type {DocumentNode}
 */

const GET_USER = gql`
    query getUser {
        user(id:"/api/users/6") {
            id
            firstname
            lastname
            email
        }
    }
`;

function DisplayUser() {
    const { loading, error, data } = useQuery(GET_USER);
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

export default function UserRequest(userId) {
    console.dir(userId);
    return (
        <div>
            <DisplayUser/>
        </div>
    );
}
