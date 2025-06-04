import React from "react";

import Category from "./Category";
import styles from "../../styles/home.module.css"

import { PhoneIcon, HeadPhoneIcon, ComputerSmallIcon, GamingIcon, SmartWatchIcon } from "../icons/icons";

const Categories: React.FC = () => {
    return (
        <div className={styles['categories-main_wrapper']}>
            <div className={styles['categories-wrapper']}>
                <div className={styles['category-header']}>
                    <h3>Browse by Category</h3>
                </div>
                <div className={styles['categories']}>
                    <Category type="Phone" to="/phone"><PhoneIcon/></Category>
                    <Category type="Head Phone" to="/head-phones"><HeadPhoneIcon/></Category>
                    <Category type="Computer" to="/computers"><ComputerSmallIcon/></Category>
                    <Category type="Gaming" to="/gaming"><GamingIcon/></Category>
                    <Category type="Smart Watch" to="/smart-watches"><SmartWatchIcon/></Category>
                </div>
            </div>
        </div>
    )
}

export default Categories;