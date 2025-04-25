import React from "react";

import Button from "../ui/Button";
import iphone from "../../assets/iphone.png"
import styles from "../../styles/banner.module.css";

const Banner: React.FC<{}> = () => {
    return (
        <div className={styles['banner-main']}>
            <div className={styles['banner-wrapper']}>
                <div className={styles['banner-text']}>
                    <p className={styles['catchy-caption']}>Pro.Beyond</p>
                    <div className={styles['brand-name']}>
                        <span>IPhone 14</span>
                        <span> Pro</span>
                    </div>
                    <p>Created to change everything for the better. For everyone</p>
                    <Button type="button" button_text="Shop Now" class_name={styles['shop-now_btn']}/>
                </div>
                <div className={styles['banner-image']}>
                    <img src={iphone} alt="Iphone Image"/>
                </div>
            </div>
        </div>
    )
}

export default Banner;