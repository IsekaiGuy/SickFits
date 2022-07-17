import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: {
      id,
    },
    update,
    optimisticResponse: {
      deleteCartItem: {
        __typename: 'CardItem',
        id,
      },
    },
  });
  return (
    <BigButton
      onClick={removeFromCart}
      title="Remove Item From Cart"
      type="button"
      disabled={loading}
    >
      &times;
    </BigButton>
  );
}

const BigButton = styled.button`
  font-size: 3rem;
  background: none;
  border: 0;

  &:hover {
    color: var(--red);
    cursor: pointer;
  }
`;
