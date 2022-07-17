/* eslint-disable*/
import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  //  Check if user is logged in
  const sesh = context.session as Session;
  if (sesh.itemId) {
    throw new Error('You must be logged in to do this');
  }
  // Query the current user cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveField: 'id, quantity'
  });
  const [existingCartItem] = allCartItems;
  //Check if item is already in the cart
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity} items in the cart, increment by one`
    );
    //If item is already in, increment it by one
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
   //If there is no item, create it
   return await context.lists.CartItem.createOne({
       data: {
           product: {connect: {id: productId}},
           user: {connect: {id: sesh.itemId}}
       }
   })
}
