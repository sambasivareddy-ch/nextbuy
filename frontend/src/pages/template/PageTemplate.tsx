import React, { useEffect, useState } from "react";
import { Location } from "react-router-dom";

import PageNavigation from "../../components/product-ui/PageNavigation";
import PageSetter from "../../components/product-ui/PageSetter";
import Product from "../../components/product-ui/Product";
import CheckBox from "../../components/ui/CheckBox";
import Filter from "../../components/ui/Filter";
import InputSlider from "../../components/ui/InputSlider";
import Loading from "../../components/ui/Loading";
import Button from "../../components/ui/Button";

import { GadgetProductDetails } from "../../types/types";

import styles from "../../styles/pages.module.css";

const PageTemplate: React.FC<{location: Location<any>, productsData?: GadgetProductDetails[] | null, isLoading: boolean, pagePath: string}> = (props) => {
    const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
    const [selectedRatings, setSelectRatings] = useState<Set<string>>(new Set());
    const [selectedProductsCount, setSelectedProductsCount] = useState<number>(0);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(10000);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
    const [noOfPages, setNoOfPages] = useState<number>(1);
    const [selectedPage, setSelectedPage] = useState<number>(0);

    useEffect(() => {
        if (props.productsData && props.productsData?.length > 0) {
            const productPrices = props.productsData.map(product => product.price);
            const minimum = Math.min(...productPrices);
            const maximum = Math.max(...productPrices)
            setMinPrice(minimum)
            setMaxPrice(maximum)
            setPriceRange([minimum, maximum])

            setNoOfPages(Math.ceil(props.productsData.length/9))
        }
    }, [props.productsData])

    useEffect(() => {
        if (props.productsData) {
            setSelectedProductsCount( props.productsData.filter((product) => {
                const brandMatch =
                    selectedBrands.size === 0 || selectedBrands.has(product.brand);
                const ratingMatch =
                    selectedRatings.size === 0 ||
                    Array.from(selectedRatings).some((minRating) => {
                        return product.ratings.average >= parseFloat(minRating);
                    });
                const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
                return brandMatch && ratingMatch && priceMatch;
            }).length)
        }
    }, [selectedBrands, selectedRatings, priceRange, props.productsData])

    const brandChangeHandler = (brandName: string) => {
        const updatedBrands = new Set(selectedBrands);
        if (updatedBrands.has(brandName)) {
            updatedBrands.delete(brandName);
        } else {
            updatedBrands.add(brandName);
        }
        setSelectedBrands(updatedBrands);
    };

    const ratingChangeHandler = (rating: string) => {
        const updatedRatings = new Set(selectedRatings);
        if (updatedRatings.has(rating)) {
            updatedRatings.delete(rating);
        } else {
            updatedRatings.add(rating);
        }
        setSelectRatings(updatedRatings);
    };

    const distinctBrands = new Set('');

    if (props.productsData) {
        for (const prod of props.productsData) {
            distinctBrands.add(prod.brand)
        }
    }

    return (
        props.isLoading ? <Loading/>:  <PageSetter>
            <div className={styles['main-page_wrapper']}>
                <div className={styles['page']}>
                    <PageNavigation location={props.location}/>
                    {props.productsData && 
                        <div className={styles['products-wrapper']}>
                            <div className={styles['product-filters']}>
                                <Filter name="Price Range">
                                    <InputSlider
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        priceRange0={priceRange[0]}
                                        priceRange1={priceRange[1]}
                                        priceChangeHandler={(range: [number, number]) => {
                                            setPriceRange([range[0], range[1]])
                                        }}
                                        isMin={true}
                                    >
                                        Min: {priceRange[0]}
                                    </InputSlider>
                                    <InputSlider
                                        minPrice={minPrice}
                                        maxPrice={maxPrice}
                                        priceRange0={priceRange[0]}
                                        priceRange1={priceRange[1]}
                                        priceChangeHandler={(range: [number, number]) => {
                                            setPriceRange([range[0], range[1]])
                                        }}
                                        isMin={false}
                                    >
                                        Max: {priceRange[1]}
                                    </InputSlider>
                                </Filter>
                                <Filter name="Brands">
                                    {distinctBrands.size !== 0 && (
                                        Array.from(distinctBrands).map((name) => {
                                            return <CheckBox 
                                                name="brand-filter" 
                                                label={name} 
                                                checked={selectedBrands.has(name)}
                                                changeHandler={brandChangeHandler}
                                                key={Math.random()}
                                            />
                                        })
                                    )}
                                </Filter>
                                {/* <Filter name="Ratings">
                                    {(
                                        ["1.0", "2.0", "3.0", "4.0", "5.0"].map((name) => {
                                            return <CheckBox 
                                                name="brand-rating-filter" 
                                                label={name} 
                                                checked={selectedRatings.has(name)}
                                                changeHandler={ratingChangeHandler}
                                                key={Math.random()}
                                            />
                                        })
                                    )}
                                </Filter> */}
                            </div>
                            <div className={styles['products']}>
                                <div className={styles['pagination-wrapper']}>
                                    <p>Selected Products: {selectedProductsCount}</p>
                                    <div className={styles['pagination-btns_wrapper']}>
                                        {
                                           Array.from({ length: noOfPages }, (_, idx) => (
                                            <Button 
                                                type="button"
                                                class_name={idx === selectedPage? styles['pagination-btns_current']: styles['pagination-btns']} 
                                                button_text={(idx + 1).toString()}  
                                                key={Math.random()}
                                                val={idx}
                                                clickHandler={(val) => setSelectedPage(val)}
                                            />
                                          ))
                                        }
                                    </div>
                                </div>
                                <div className={styles['products-list']}>
                                    {props.productsData && props.productsData
                                        .filter((product) => {
                                            const brandMatch =
                                                selectedBrands.size === 0 || selectedBrands.has(product.brand);
                                            const ratingMatch =
                                                selectedRatings.size === 0 ||
                                                Array.from(selectedRatings).some((minRating) => {
                                                    return product.ratings.average >= parseFloat(minRating);
                                                });
                                            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
                                            return brandMatch && ratingMatch && priceMatch;
                                        })
                                        .slice(selectedPage*9, (selectedPage+1)*9)?.map((product) => (
                                            <Product
                                                productDetails={product}
                                                key={Math.random()} 
                                                product_category={product.category.name}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {!props.productsData && 
                        <div className={styles['no-products']}>
                            <h2>Products are yet to add!!</h2>
                        </div>
                    }
                </div>
            </div>
        </PageSetter>
    )
}

export default PageTemplate;