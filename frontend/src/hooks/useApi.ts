import { useState } from "react";

import { GadgetProductDetails } from "../types/types";

const useApi =  (uri: string, method: string): [(payload: any) => Promise<void>, GadgetProductDetails[] | undefined | null, boolean, string] => {
    const [apiData, setApiData] = useState<GadgetProductDetails[] | null>()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const postData = async (payload: any): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(uri, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setApiData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return [postData, apiData, isLoading, error || ""];
}

export default useApi;