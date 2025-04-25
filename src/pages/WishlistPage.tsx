import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import PageSetter from "../components/product-ui/PageSetter";
import CartProduct from "../components/product-ui/CartProduct";
import PageNavigation from "../components/product-ui/PageNavigation";

import styles from "../styles/wishlist.module.css";
import type { RootState } from "../store/store";
import Toast from "../components/ui/Toast";

const WishlistPage: React.FC = () => {
    const location = useLocation();
    const wishlist = useSelector((state: RootState) => state.favorite)
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isRemovedFromWishlist, setIsRemovedFromWishlist] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsRemovedFromWishlist(false);
        }, 3000)
    })

    useEffect(() => {
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 3000)
    })

    return <PageSetter>
        <div className={styles['main-page_wrapper']}>
            <div className={styles['page']}>
                <PageNavigation location={location}/>
                <div className={styles['wishlist_wrapper']}>
                    <h2>Wishlist Cart</h2>
                    <div className={styles['wishlist']}>
                        {wishlist.totalProducts !== 0 &&
                            Object.entries(wishlist.products).map(([_, prod]) => {
                                return <CartProduct
                                    productDetails={prod.product}
                                    count={1}
                                    type="wishlist"
                                    key={Math.random()}
                                    addToCartHandler={() => {setIsAddedToCart(true)}}
                                    removeFromWishlistHandler={() => {setIsRemovedFromWishlist(true)}}
                                />
                            })
                        }
                    </div>
                    {wishlist.totalProducts === 0 &&
                        <p>Oops! No products are in Wishlist</p>
                    }
                </div>
            </div>
            {isAddedToCart && createPortal(
                <Toast type="success" message="Added to cart successfully"/>,
                document.getElementById("toast")!
            )}
            {isRemovedFromWishlist && createPortal(
                <Toast type="failure" message="Removed from wishlist successfully"/>,
                document.getElementById("toast")!
            )}
        </div>
    </PageSetter>
}

export default WishlistPage;