import React, { ReactNode } from "react";

import Header from "../navigation/Header";
import Footer from "../ui/Footer";

const PageSetter: React.FC<{children: ReactNode}> = (props) => {
    return <>
        <Header/>
            {props.children}
        <Footer/>
    </>
}

export default PageSetter;