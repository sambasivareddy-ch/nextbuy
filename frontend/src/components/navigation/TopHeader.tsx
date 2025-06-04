import React from "react";
import { useSelector } from "react-redux";

import NavigationLink from "./NavigationLink";
import { FavoriteIcon, CartIcon, UserIcon } from "../icons/icons";

import type { RootState } from "../../store/store";
import styles from "../../styles/navigation.module.css";

const TopHeader: React.FC = () => {
    const totalProductsInCart = useSelector((state: RootState) => state.cart.totalProducts);
    const totalProductsInWishList = useSelector((state: RootState) => state.favorite.totalProducts);

    return (
        <div className={styles['page-top_header']}>
            <div className={styles['page-header']}>
                <div className={styles['page-title']}>
                    <p>NextBuy</p>
                </div>
                {/* <nav className={styles['page-top_header__nav']}>
                    <NavigationLink link_text="Home" to="/"/>
                    <NavigationLink link_text="About" to="/about"/>
                    <NavigationLink link_text="Contact" to="/contact"/>
                </nav> */}
                <div className={styles['page-top_header_shop-nav']}>
                    <NavigationLink to="/favorite" link_text={totalProductsInWishList.toString()}>
                        <FavoriteIcon/>
                    </NavigationLink>
                    <NavigationLink to="/cart" class_name={styles['cart']} link_text={totalProductsInCart.toString()}>
                        <CartIcon/>
                    </NavigationLink>
                    <NavigationLink to="/profile">
                        <UserIcon/>
                    </NavigationLink>
                </div>
            </div>
        </div>
    )
}

export default TopHeader;