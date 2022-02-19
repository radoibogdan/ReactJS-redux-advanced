import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Slices
import { uiActions } from "./store/ui-slice";

// Components
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./UI/Notification";
import { sendCartData } from "./store/cart-slice";

// On app start to avoid setting the firebase data equal to our initial empty store we create a variable
// isInitial is not reinitialized if our component rerenders again
let isInitial = true;

function App() {
  const showCart = useSelector((store) => store.ui.cartIsVisible);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const notification = useSelector((store) => store.ui.notification);

  useEffect(() => {
    // On app start to avoid setting the firebase data equal to our initial empty store
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
