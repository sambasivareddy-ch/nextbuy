import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import PageSetter from "../components/product-ui/PageSetter";
import PageNavigation from "../components/product-ui/PageNavigation";
import Loading from "../components/ui/Loading";
import { AddToWishlistBtn, AddToCartlistBtn } from "../components/ui/Button";
import Toast from "../components/ui/Toast";
// import StarRating from "../components/product-ui/StarRating";
import { ShippingIcon, InHouseIcon, GuaranteeIcon } from "../components/icons/icons";

import useFetch from "../hooks/useFetch";
import { addToCart } from "../store/cartSlice";
import { addToWishlist } from "../store/wishlistSlice";

import styles from "../styles/productpage.module.css";

const ProductPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const params = useParams();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

    const [fetchApi, response, isLoading] = useFetch()

    useEffect(() => {
        fetchApi(`http://localhost:5000/product/${params?.id}`, '');
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsAddedToCart(false)
        }, 3000)
    }, [isAddedToCart])

    useEffect(() => {
        setTimeout(() => {
            setIsAddedToWishlist(false)
        }, 3000)
    }, [isAddedToWishlist])

    const addToCartClickHandler = () => {
        if (response) {
            dispatch(addToCart({
                product: response.product,
            }))
            setIsAddedToCart(true);
        }
    }

    const addToWishlistClickHandler = () => {
        if (response) {
            dispatch(addToWishlist({
                product: response.product,
            }))
            setIsAddedToWishlist(true);
        }
    }

    return isLoading? <Loading/> : (
        response && response.product && 
        <PageSetter>
            <div className={styles['main-page_wrapper']}>
                <div className={styles['page']}>
                    <PageNavigation location={location}/>
                    <div className={styles['product-details_wrapper']}>
                        <div className={styles['product-images']}>
                            <img src={response.product.image} alt="product image"/>
                        </div>
                        <div className={styles['product-details']}>
                            <div className={styles['product-basic_details']}>
                                <h1>{response.product.brand} {response.product.name}</h1>
                                <h2>&#36;{response.product.price}</h2>
                               {/* <StarRating rating={response.product?.ratings.average} count={response.product?.ratings.count}/> */}
                            </div>
                            <div className={styles['product-colors']}>
                                <p>Choose Colors: </p>
                                <span className={styles['red']}></span>
                                <span className={styles['blue']}></span>
                                <span className={styles['white']}></span>
                                <span className={styles['black']}></span>
                                <span className={styles['purple']}></span>
                            </div>
                            <ol className={styles['product-specifications']}>
                                <h3>Specifications</h3>
                                {response.product.description && 
                                    Object.entries(JSON.parse(response.product.description)).map(([key, value]) => (
                                        <li key={Math.random()}>
                                            <b>{key}: </b>
                                            <span>{value as string}</span>
                                        </li>
                                    ))
                                }
                            </ol>
                            <div className={styles['action-buttons']}>
                                <AddToWishlistBtn 
                                    button_text="Add to Wishlist" 
                                    class_name={styles['wishlist_btn']}
                                    clickHandler={addToWishlistClickHandler}
                                />
                                <AddToCartlistBtn 
                                    button_text="Add to Cart" 
                                    class_name={styles['cart_btn']}
                                    clickHandler={addToCartClickHandler}
                                />
                            </div>
                            <div className={styles['delivary-info_wrapper']}>
                                <div className={styles['delivary-info']}>
                                    <ShippingIcon/>
                                    <p>Free Delivery</p>
                                </div>
                                <div className={styles['delivary-info']}>
                                    <InHouseIcon/>
                                    <p>In Stock</p>
                                </div>
                                <div className={styles['delivary-info']}>
                                    <GuaranteeIcon/>
                                    <p>1 Year Waranty</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isAddedToCart && createPortal(
                    <Toast type="success" message="Successfully added to Cart!!"/>,
                    document.getElementById('toast')!
                )}
                {isAddedToWishlist && createPortal(
                    <Toast type="success" message="Successfully added to Wishlist!!"/>,
                    document.getElementById('toast')!
                )}
            </div>
        </PageSetter>
    )
}

export default ProductPage;