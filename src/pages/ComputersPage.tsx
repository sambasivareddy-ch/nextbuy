import React from "react"
import { useLocation } from "react-router-dom";

import PageTemplate from "./template/PageTemplate";

const ComputersPage: React.FC = () => {
    const location = useLocation();

    return (
        <PageTemplate pagePath="computers" location={location} isLoading={false}/>
    )
}

export default ComputersPage;