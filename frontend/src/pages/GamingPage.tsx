import React from "react"

import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";

const GamingPage: React.FC = () => {
    const location = useLocation();

    return (
        <PageTemplate pagePath="gaming" location={location} isLoading={false}/>
    )
}

export default GamingPage;