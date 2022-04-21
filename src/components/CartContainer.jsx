import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { openModal } from '../features/modal/modalSlice';
import Cartitem from './CartItem';

const Cartcontainer = () => {

    const { cartItems, total, amount } = useSelector(state => state.cart)
    const dispatch = useDispatch();

    if (amount < 1) {
        return (
            <section className="cart">
                <header>
                    <h2>your bag</h2>
                    <h4 className="empty-cart">
                        is currently empty
                    </h4>
                </header>
            </section>
        )
    }

    return (
        <section className='cart'>
            <h2> Your bag </h2>

            <div>
                {
                    cartItems.map(item => (
                        <Cartitem key={item.id} {...item} />
                    ))
                }
            </div>

            <footer>
                <hr />
                <div className="cart-total">
                    <h4> total <span>${total}</span> </h4>
                </div>
                <button className='btn clear-btn' onClick={() => dispatch(openModal())}>
                    clear cart
                </button>
            </footer>
        </section>
    );
}

export default Cartcontainer;
