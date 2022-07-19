import { KeystoneContext } from '@keystone-next/types';

import {
  CartItemCreateInput,
  OrderCreateInput,
} from '../.keystone/schema-types';
import stripeConfig from '../lib/stripe';

async function checkout(
  root: any,
  { token }: { token: string },
  context: KeystoneContext
): Promise<OrderCreateInput> {
  const userId = context.session.itemId;

  if (!userId) {
    throw new Error('Sorry! You must be signed to create an order');
  }

  const user = await context.lists.User.findOne({
    where: { id: userId },
    resolveFields: `
            id
            name
            email
            cart {
                id
                quantity
                product {
                    name
                    price
                    description
                    id
                    photo {
                        id
                        image {
                            id
                            publicUrlTransformed
                        }
                    }
                }
            }
        `,
  });

  const cartItems = user.cart.filter((cartItem) => cartItem.product);
  const amount = cartItems.reduce(
    (acc: number, cartItem: CartItemCreateInput) =>
      acc + cartItem.quantity * cartItem.product.price,
    0
  );

  const charge = await stripeConfig.paymentIntents
    .create({
      amount,
      currency: 'USD',
      confirm: true,
      payment_method: token,
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
}

export default checkout;
