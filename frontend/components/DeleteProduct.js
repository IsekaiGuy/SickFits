import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

// eslint-disable-next-line react/prop-types
export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
    update,
  });
  return (
    <button
      disabled={loading}
      type="button"
      onClick={() => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure you want to delete it?')) {
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}
