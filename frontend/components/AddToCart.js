import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const { openCart } = useCart();
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      id,
    },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  return (
    <ButtonStyles
      type="button"
      disabled={loading}
      onClick={() => {
        addToCart();
        openCart();
      }}
    >
      Add{loading && 'ing'} To Cart
    </ButtonStyles>
  );
}

const ButtonStyles = styled.button`
  cursor: pointer;
`;
