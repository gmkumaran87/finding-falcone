class HttpFetch {
    // GET Method for API
    async get(url) {
        const apiResponse = await fetch(url);
        const apiData = await apiResponse.json();

        return apiData;
    }

    async post(url, inputData) {
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputData)
        };
        try {
            const fetchResponse = await fetch(url, settings)
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return `Unexpected Error from the API ${e}`;
        }

    }
}