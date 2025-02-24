export default function HandleUtmSource(){
    const queryParams = new URLSearchParams(window.location.search);
    const queryObject = {};
    queryParams.forEach((value, key) => {
        if(key?.startsWith('utm_')){
            queryObject[key] = value;
        }
    });
    localStorage.setItem('urlQuery', JSON.stringify(queryObject));
}