import {useEffect, useState} from "react";

export default function useFetch({ token, address, hasToken, method = "GET", body = null }={}) {
    const [data, setData] = useState(null);
    const [dataLoading, setDataLoading] = useState(false);
    const [dataError, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token && hasToken) return;
                if (!address) return;

                setDataLoading(true);

                const headers = {
                    'Content-Type': 'application/json'
                };

                if (hasToken)
                    headers['Authorization'] = `Bearer ${token}`;

                const options = {
                    method,
                    headers,
                };

                if (body) {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(address, options);

                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);

                const responseData = await response.json();
                responseData ? setData(responseData) : setData([]);
            } catch (err) {
                setError(err.message);
            } finally {
                setDataLoading(false);
            }
        };

        fetchData();
    }, [token, address, hasToken, method, body]);

    return { data, dataError, dataLoading };
}
