import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import {API_ID, API_DATA, API_CDN, API_VERSION} from "@env";


export const client = sanityClient({
    projectId: API_ID,
    dataset: API_DATA,
    useCdn: API_CDN,
    apiVersion:API_VERSION,
});


const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;

