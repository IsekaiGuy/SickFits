import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

export function CartStateProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  function toggleIsCartOpen() {
    setIsCartOpen(!isCartOpen);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ isCartOpen, toggleIsCartOpen, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

export function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}
