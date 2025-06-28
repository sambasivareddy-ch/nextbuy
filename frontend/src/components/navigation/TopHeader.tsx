import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavigationLink from "./NavigationLink";
import Button from "../ui/Button";
import { clearUser } from "../../store/userSlice";
import { FavoriteIcon, CartIcon, UserIcon, LogoutBtnIcon } from "../icons/icons";

import type { RootState } from "../../store/store";
import styles from "../../styles/navigation.module.css";

const TopHeader: React.FC = () => {
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const totalProductsInCart = useSelector((state: RootState) => state.cart.totalProducts);
    const totalProductsInWishList = useSelector((state: RootState) => state.favorite.totalProducts);

    const logoutBtnHandler = () => {
        dispatcher(clearUser());
        navigate('/');
    }

    return (
        <div className={styles['page-top_header']}>
            <div className={styles['page-header']}>
                <div className={styles['page-title']}>
                    <p>NextBuy</p>
                </div>
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
                    <Button
                        type="button"
                        button_text={<LogoutBtnIcon/>}
                        class_name={styles['logout-btn']}
                        clickHandler={logoutBtnHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default TopHeader;