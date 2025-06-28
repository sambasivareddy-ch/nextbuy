import { useState } from "react";

const useFetch =  (): [(url: string, token: string) => Promise<void>, any | undefined | null, boolean] => {
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchApi = async (url: string, token: string) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${url}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
                }
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