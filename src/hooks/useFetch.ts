import { useState } from "react";

import { GadgetProductDetails } from "../types/types";

const useFetch =  (uri: string): [() => Promise<void>, GadgetProductDetails[] | undefined | null, boolean] => {
    const [apiData, setApiData] = useState<GadgetProductDetails[] | null>()
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApi = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${uri}`, {
                method: "GET"
            })
    
            if (!response.ok) {
                console.log("Unable to get data")
                return
            }
    
            const data = await response.json();
    
            setApiData(data)
            setIsLoading(false)
        } catch(e) {
            console.log(e)
        }
    }

    return [fetchApi, apiData, isLoading]
}

export default useFetch;