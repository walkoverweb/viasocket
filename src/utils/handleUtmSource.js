export default function HandleUtmSource() {
    if (!localStorage.getItem('utmData')) {
        const queryParams = new URLSearchParams(window.location.search);
        const queryObject = {};

        queryParams.forEach((value, key) => {
            if (key.startsWith('utm_')) {
                queryObject[key] = value;
            }
        });

        // Store only on the first visit
        if (Object.keys(queryObject).length > 0) {
            localStorage.setItem('utmData', JSON.stringify(queryObject));
        }
    }
}
