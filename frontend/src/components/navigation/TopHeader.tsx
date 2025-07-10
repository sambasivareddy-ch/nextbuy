import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavigationLink from "./NavigationLink";
import Button from "../ui/Button";
import { clearUser } from "../../store/userSlice";
import { FavoriteIcon, CartIcon, UserIcon, LogoutBtnIcon } from "../icons/icons";

import type { RootState } from "../../store/store";
import styles from "../../styles/navigation.module.css";

const TopHeader: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const dispatcher = useDispatch();
    const navigate = useNavigate();
    const totalProductsInCart = useSelector((state: RootState) => state.cart.totalProducts);
    const totalProductsInWishList = useSelector((state: RootState) => state.favorite.totalProducts);
    const userInfo: any = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (userInfo.isAuthenticated) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false); 
        }
    })


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
                    {isLoggedIn && <>
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
                        </>
                    }
                    {!isLoggedIn && 
                        <NavigationLink to="/login">
                            <p>Login</p>
                        </NavigationLink>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopHeader;