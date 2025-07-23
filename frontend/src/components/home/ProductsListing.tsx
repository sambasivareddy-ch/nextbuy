import React, { useState } from "react";

import styles from "../../styles/home.module.css";
import Product from "../product-ui/Product";
import RadioInput from "../ui/RadioInput";

import { GadgetProductDetails } from "../../types/types";

const ProductsListing: React.FC<{productsData: GadgetProductDetails[] | null | undefined}> = (props) => {
    const [checkedRadio, setCheckedRadio] = useState<number>(1)

    const firstChangeHandler = () => {
        setCheckedRadio(1)
    }

    const secondChangeHandler = () => {
        setCheckedRadio(2)
    }

    const threeChangeHandler = () => {
        setCheckedRadio(3)
    }

    return (
        <div className={styles['products-list_wrapper']}>
            <div className={styles['products-list_main']}>
                <div className={styles['products-tag_wrapper']}>
                    <RadioInput 
                        name="products-tag" 
                        label="New Arrival" 
                        checked={checkedRadio === 1}
                        changeHandler={firstChangeHandler}
                    />
                    <RadioInput 
                        name="products-tag" 
                        label="Bestsellers" 
                        checked={checkedRadio === 2}
                        changeHandler={secondChangeHandler}
                    />
                    <RadioInput 
                        name="products-tag" 
                        label="Featured Products" 
                        checked={checkedRadio === 3}
                        changeHandler={threeChangeHandler}
                    />
                </div>
                <div className={styles['products-wrapper']}>
                    {props.productsData && checkedRadio === 1 && props.productsData.slice(0,8).map((product) => {
                        return <Product 
                            productDetails={product}
                            key={Math.random()}
                            product_category={"phone"}
                        />
                    })}
                    {props.productsData && checkedRadio === 2 && props.productsData.slice(0, 8).map((product) => {
                        return <Product 
                            productDetails={product}
                            key={Math.random()}
                            product_category={"phone"}
                        />
                    })}
                    {props.productsData && checkedRadio === 3 && props.productsData.slice(0,8).map((product) => {
                        return <Product 
                            productDetails={product}
                            key={Math.random()}
                            product_category={"phone"}
                        />
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductsListing;