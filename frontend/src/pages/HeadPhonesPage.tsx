import React from "react"

import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";

const HeadPhonesPage: React.FC = () => {
    const location = useLocation();

    return (
        <PageTemplate pagePath="head-phones" location={location} isLoading={false}/>
    )
}

export default HeadPhonesPage;