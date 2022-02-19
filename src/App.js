import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Slices
import { uiActions } from "./store/ui-slice";

// Components
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./UI/Notification";

// On app start to avoid setting the firebase data equal to our initial empty store we create a variable
// isInitial is not reinitialized if our component rerenders again
let isInitial = true;

function App() {
  const showCart = useSelector((store) => store.ui.cartIsVisible);
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const notification = useSelector((store) => store.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data !",
        })
      );
      const response = await fetch(
        "https://react-movie-http-95492-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      // if code gets to here = success
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    };

    // On app start to avoid setting the firebase data equal to our initial empty store
    if (isInitial) {
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    });
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
