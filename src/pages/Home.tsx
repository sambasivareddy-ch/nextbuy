import React, { useEffect } from "react";

import Banner from "../components/home/Banner";
// import SubBanner from "../components/home/SubBanner";
import Categoies from "../components/home/Categories";
import ProductsListing from "../components/home/ProductsListing";
import PageSetter from "../components/product-ui/PageSetter";

import useFetch from "../hooks/useFetch";

const Home: React.FC = () => {
    const [fetchPhones, phones] = useFetch('https://67f4e26e913986b16fa22fb4.mockapi.io/api/v1/phone');

    useEffect(() => {
        fetchPhones();
    }, [])

    return (
        <PageSetter>
            <Banner/>
            {/* <SubBanner/> */}
            <Categoies/>
            <ProductsListing productsData={phones}/>
        </PageSetter>
    )
}

export default Home;