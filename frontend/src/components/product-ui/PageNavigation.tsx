import React from "react";
import { Link, Location } from "react-router-dom";

import styles from "../../styles/pagenav.module.css";
import { PageSegmentsInfo } from "../../types/types";

const PageNavigation: React.FC<{location: Location<any>}> = (props) => {
    const segments: string[] = props.location.pathname.split("/")

    const pageSegments = new Array<PageSegmentsInfo>(0)
    let pathUntilNow = "http://localhost:5173/"
    for (const segment of segments) {
        pathUntilNow = pathUntilNow.substring(0, pathUntilNow.length-1)
        pathUntilNow += "/" + segment 
        const pageSegment: PageSegmentsInfo = {
            pagePath: pathUntilNow,
            pageName: segment === ""? "Home": segment,
        }
        pageSegments.push(pageSegment)
    }

    return (
        <nav className={styles['page-nav_wrapper']}>
            {
                pageSegments.map((pageInfo, idx) => {
                    return (
                        <span key={Math.random()}>
                            <Link to={pageInfo.pagePath} key={Math.random()}>
                                {pageInfo.pageName}
                            </Link>
                            {idx < pageSegments.length - 1 && " / "}
                        </span>
                    )
                })
            }
        </nav>
    )
}

export default PageNavigation;