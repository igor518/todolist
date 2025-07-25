import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { TailChase } from 'ldrs/react';
import 'ldrs/react/TailChase.css';
import './index.css';
import { GET_USER } from '../graphql_query';

/**
 * A React memoized functional component that fetches and displays user information.
 *
 * @const {React.MemoExoticComponent<React.FC<{ userId: string }>>} DisplayUser
 * @param {Object} props - The component's props.
 * @param*/
const DisplayUser = React.memo(({ userId }) => {
    console.log("DisplayUser rendered", new Date().toISOString());

    const { loading, error, data } = useQuery(GET_USER,{
        variables: { id: `/api/users/${userId}` },
        fetchPolicy: 'cache-first'
    });

    if (loading) {
        return (
            <div className="tw:flex tw:w-[330px] tw:justify-center tw:gap-4 tw:border tw:border-primary tw:rounded-[10px] tw:p-4 tw:items-center">
                <TailChase size="40" speed="1.75" color="#03A9F4" />
            </div>
        );
    }

    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="@container" key={data.user.id}>
            <div className="tw:flex tw:w-[330px] tw:gap-2 tw:border tw:border-primary tw:rounded-[10px] tw:p-4">
                <img src="/images/photo_icon.svg" alt="photo" className="tw:w-12 tw:h-12" />
                <ul>
                    <li className="tw-truncate tw-text-xs tw-text-gray-600 tw-max-w-[280px]" title={data.user.firstname + ' ' + data.user.lastname}>{`${data.user.firstname} ${data.user.lastname}`}</li>
                    <li className="tw-truncate tw-text-xs tw-text-gray-600 tw-max-w-[280px]" title={data.user.email}>{data.user.email}</li>
                    
                </ul>
            </div>
        </div>
    );
}, (prev, next) => prev.userId === next.userId);

const UserRequest = ({userId}) => {
    return (
        <div>
            <DisplayUser userId={userId}/>
        </div>
    );
};

export default UserRequest;
