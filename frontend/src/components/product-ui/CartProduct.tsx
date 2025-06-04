import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { AddToCartlistBtn } from "../ui/Button";

import styles from "../../styles/cart.module.css";
import { removeFromCart, addToCart, increaseTheSelectedProductToGivenCount } from "../../store/cartSlice";
import { removeFromWishlist } from "../../store/wishlistSlice";

type SectionType = "cart" | "wishlist" | "summary"
import { GadgetProductDetails } from "../../types/types";

const CartProduct: React.FC<{
    productDetails: GadgetProductDetails
    count: number,
    type: SectionType,
    className?: string,
    addToCartHandler?: () => void,
    removeFromCartHandler?: () => void,
    removeFromWishlistHandler?: () => void,
}> = (props) => {
    const dispatch = useDispatch();
    const [productCount, setProductCount] = useState(props.count);

    const buttonClickHandler = () => {
        dispatch(removeFromCart({
            productId: props.productDetails.productId,
        }))
        props.removeFromCartHandler?.()
    }

    const addToCartBtnClickHandler = () => {
        dispatch(addToCart({
            product: props.productDetails,
        }))
        dispatch(removeFromWishlist({
            productId: props.productDetails.productId,
        }))
        props.addToCartHandler?.()
    }

    const removeProductFromWishlistHandler = () => {
        dispatch(removeFromWishlist({
            productId: props.productDetails.productId,
        }))
        props.removeFromWishlistHandler?.()
    }

    const productCountChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(increaseTheSelectedProductToGivenCount({
            productId: props.productDetails.productId,
            count: parseInt(e.target.value),
        }))
        setProductCount(parseInt(e.target.value))
    }

    return <div className={`${styles['cart-product_wrapper']} ${props.className}`}>
        <div className={styles['cart-product_info']}>
            <img src={props.productDetails.image} alt="cart product"/>
            <div>
                <p className={styles['brand']}>{props.productDetails.brand} {props.productDetails.model}</p>
            </div>
        </div>
        <div className={styles['product-cost_info']}>
            {props.type === "cart" && <select defaultValue={productCount} onChange={productCountChangeHandler}>
                {[...Array(100)].map((_, idx) => {
                    return <option value={idx + 1} key={Math.random()}>{ idx + 1 }</option>
                })}
            </select>}
            <p className={styles["price"]}>
                &#36;{(props.type === "cart" || props.type === "summary") && props.count} {(props.type === "cart" || props.type === "summary") && "X"} {props.productDetails.price}
            </p>
            <div>
                {props.type === "wishlist" && <AddToCartlistBtn 
                    clickHandler={addToCartBtnClickHandler} 
                    button_text={<AddShoppingCartIcon/>}
                    class_name={styles['add-to-cart_btn']}
                />}
                {props.type === "wishlist" && <button className={styles["delete-product"]} onClick={removeProductFromWishlistHandler}>
                    <CloseIcon/>
                </button>}
                {props.type === "cart" && <button className={styles["delete-product"]} onClick={buttonClickHandler}>
                    <CloseIcon/>
                </button>}
            </div>
        </div>
    </div>
}

export default CartProduct;