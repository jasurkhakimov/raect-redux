import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartcontainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";

function App() {

  const { cartItems, isLoading } = useSelector(state => state.cart);
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCartItems('some'))
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1> Loading... </h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <Cartcontainer />
    </main>
  );
}
export default App;
