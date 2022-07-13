import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';
import Form from './styles/Form';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

// eslint-disable-next-line react/prop-types
export default function UpdateProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });
  const [updateProduct, mutationResponse] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);
  if (loading) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        });
      }}
    >
      <DisplayError error={error || mutationResponse.error} />
      <fieldset
        disabled={mutationResponse.loading}
        aria-busy={mutationResponse.loading}
      >
        <label htmlFor="name">
          Name
          <input
            required
            minLength={3}
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
