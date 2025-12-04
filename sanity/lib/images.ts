import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "./client";

export const imageUrlBuilder = createImageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  return imageUrlBuilder.image(source);
};
