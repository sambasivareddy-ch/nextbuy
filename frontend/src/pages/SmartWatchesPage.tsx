import React, { useEffect } from "react"

import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";
import useFetch from "../hooks/useFetch";

const SmartWatchesPage: React.FC = () => {
    const location = useLocation();
    const [fetchApi, data, isLoading] = useFetch()

    useEffect(() => {
        fetchApi('https://67f4e26e913986b16fa22fb4.mockapi.io/api/v1/smartwatch', '');
    }, [])

    return (
        <PageTemplate 
            pagePath="smartwatch" 
            location={location} 
            productsData={data} 
            isLoading={isLoading}
        />
    )
}

export default SmartWatchesPage;