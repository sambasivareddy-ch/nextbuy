import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";
import useFetch from "../hooks/useFetch";

const PhonePage: React.FC = () => {
    const location = useLocation()
    const [fetchApi, data, isLoading] = useFetch()

    useEffect(() => {
        fetchApi(`${import.meta.env.VITE_APP_SERVER_URL}/category/phone`, '')
    }, [])

    return (
        <PageTemplate 
            pagePath={"phone"} 
            location={location} 
            productsData={data.products} 
            isLoading={isLoading}
        />
    )
}

export default PhonePage;