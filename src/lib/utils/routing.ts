export function getCurrentUrlSearchParams() {
    const searchStringStartingIndex = window.location.hash.indexOf("?")
    let urlParams: URLSearchParams = new URLSearchParams(window.location.hash.substring(searchStringStartingIndex));
    
    return urlParams;
}
