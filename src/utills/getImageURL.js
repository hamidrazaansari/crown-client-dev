export default function getImageURL(url) {
    if (url?.startsWith("http")) {        
        return url;
    }
    return `http://crown-api.esta-dev.com/uploads/${url}`;
}