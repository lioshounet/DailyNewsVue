export function validateURL(url) {
    const urlregex = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;
    return urlregex.test(url);
}

export default {
    validateURL
}