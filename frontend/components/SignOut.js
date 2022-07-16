import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  return (
    <button
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to sign out?')) {
          signout();
          Router.push({
            pathname: '/',
          });
        }
      }}
    >
      Sign Out
    </button>
  );
}
