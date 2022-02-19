import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const showCart = useSelector(store => store.ui.cartIsVisible)
  const cart = useSelector(store => store.cart);
  
  useEffect(() => {
    fetch('https://react-movie-http-95492-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
      method : 'PUT',
      body: JSON.stringify(cart)
    })
  }, [cart])
  // https://react-movie-http-95492-default-rtdb.europe-west1.firebasedatabase.app/
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
