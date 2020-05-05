//utility fuctions allow us to keep organize functions that we might use in multiple locations

export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  )
  //if there is already an existing item in the cart...
  if (existingCartItem) {
    return cartItems.map(cartItem => 
      cartItem.id === cartItemToAdd.id 
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
      )
  }
  //quantity property gets attached the first time around since this if block won't run when it's a new item
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}