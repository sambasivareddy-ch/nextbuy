import { useState } from "react";

const useApi =  (uri: string, method: string, token: string): [(payload?: any) => Promise<void>, any, boolean, string] => {
    const [apiData, setApiData] = useState()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiCaller = async (payload?: any): Promise<void> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(uri, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "authorization": token,
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

    return [apiCaller, apiData, isLoading, error || ""];
}

export default useApi;