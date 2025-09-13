import React, { useEffect } from "react"

import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";
import useFetch from "../hooks/useFetch";

const SmartWatchesPage: React.FC = () => {
    const location = useLocation();
    const [fetchApi, data, isLoading] = useFetch()

    useEffect(() => {
        fetchApi(`${import.meta.env.VITE_APP_SERVER_URL}/category/watches`, '');
    }, [])

    return (
        <PageTemplate 
            pagePath="smartwatch" 
            location={location} 
            productsData={data.products} 
            isLoading={isLoading}
        />
    )
}

export default SmartWatchesPage;