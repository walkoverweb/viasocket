export default function getImageURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png|bmp|tiff|webp|svg)$/i) ? url : 'https://placehold.co/40x40';
}
