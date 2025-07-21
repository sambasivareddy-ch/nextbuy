import React from "react";

import { FavoriteIcon } from "../icons/icons";
import LinkButton from "../ui/LinkButton";
import { GadgetProductDetails } from "../../types/types";

import styles from "../../styles/product.module.css";

const Product: React.FC<{productDetails: GadgetProductDetails, product_category?: string}> = (props) => {
    const thisProductPath = `/${props.product_category}/${props.productDetails._id}`

    return (
        <div className={styles['product-main_wrapper']}>
            <div className={styles['product-wrapper']}>
                <div className={styles['product-like_wrapper']}>
                    <FavoriteIcon/>
                </div>
                <div className={styles['product-details']}>
                    <img src={props.productDetails.image} alt="Product Image"/>
                    <p>{props.productDetails.brand} {props.productDetails.model}</p>
                    <p>&#36; {props.productDetails.price}</p>
                    <LinkButton to={thisProductPath} link_text="Show Info" class_name={styles['product-btn']}/>
                </div>
            </div>
        </div>
    )
}

export default Product;