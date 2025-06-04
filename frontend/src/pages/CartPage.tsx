import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import PageSetter from "../components/product-ui/PageSetter";
import CartProduct from "../components/product-ui/CartProduct";
import Button from "../components/ui/Button";
import PageNavigation from "../components/product-ui/PageNavigation";
import Toast from "../components/ui/Toast";
import Confirm from "../components/ui/Confirm";

import styles from "../styles/cart.module.css";
import type { RootState } from "../store/store";

const CartPage: React.FC = () => {
    const location = useLocation();
    const cart = useSelector((state: RootState) => state.cart)
    // const [estimatedTax] = useState<number>(Math.ceil(Math.random() * 100))
    // const [estimatedShippingTax] = useState<number>(Math.ceil(Math.random() * 100))
    const [isRemovedFromCart, setIsRemovedFromCart] = useState(false);
    const [isConfirmedToCheckout, setIsConfirmedToCheckout] = useState(false);
    const [isCheckoutBtnClicked, setIsCheckoutBtnClicked] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsRemovedFromCart(false)
        }, 3000)
    }, [isRemovedFromCart])

    useEffect(() => {
        if (isConfirmedToCheckout) {
            window.location.href = "/checkout"
        }
    }, [isConfirmedToCheckout])

    const formSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
    }

    return <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
                <div className={styles['main-wrapper']}>
                    <div className={styles['shopping-cart_wrapper']}>
                        <h2>Shopping Cart</h2>
                        <div className={styles['cartlist']}>
                            {cart.totalProducts !== 0 &&
                                Object.entries(cart.products).map(([_, prod]) => {
                                    return <CartProduct
                                        productDetails={prod.product}
                                        count={prod.count}
                                        type="cart"
                                        key={Math.random()}
                                        removeFromCartHandler={() => {setIsRemovedFromCart(true)}}
                                    />
                                })
                            }
                        </div>
                        {cart.totalProducts === 0 &&
                            <p>Oops! Yet to add product in the cart</p>
                        }
                    </div>
                    <div className={styles['order-summary_wrapper']}>
                        <h2>Order Summary</h2>
                        <form className={styles['order-summary_form']} onSubmit={formSubmitHandler}>
                            <input type="text" placeholder="Discount / Promo code" />
                            <div className={styles['order-info']}>
                                <p>Subtotal</p>
                                <p>&#36;{cart.totalPrice}</p>
                            </div>
                            {/* <div className={styles['order-info']}>
                                <p>Estimated Tax</p>
                                <p>&#36;{cart.totalPrice === 0? 0: estimatedTax}</p>
                            </div>
                            <div className={styles['order-info']}>
                                <p>Estimated shipping & Handling</p>
                                <p>&#36;{cart.totalPrice === 0? 0: estimatedShippingTax}</p>
                            </div> */}
                            <div className={styles['order-info_total']}>
                                <p>Total</p>
                                <p>&#36; {cart.totalPrice}</p>
                            </div>
                            <Button 
                                type="submit" 
                                button_text={"Checkout"} 
                                class_name={styles['order-checkout_btn']}
                                clickHandler={() => {setIsCheckoutBtnClicked(true)}}
                            />
                        </form>
                    </div>
                </div>
            </div>
            {isRemovedFromCart && createPortal(
                <Toast type="failure" message="Removed from Cart Successfully"/>,
                document.getElementById("toast")!
            )}
            {isCheckoutBtnClicked && createPortal(
                <Confirm 
                    message="Proceed to Checkout?" 
                    cancelClickHandler={() => {setIsCheckoutBtnClicked(false)}}
                    okClickHandler={() => {setIsConfirmedToCheckout(true)}}    
                />,
                document.getElementById("confirm")!
            )}
        </div>
    </PageSetter>
}

export default CartPage;