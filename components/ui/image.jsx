import { urlFor } from "@/lib/sanity.image-url";
import Image from "next/image";

const ImageComponent = ({ image, className }) => {
  return (
    <Image
      src={urlFor(image).quality(100).url()}
      fill
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        (max-width: 1536px) 33vw,
        25vw
      "
      alt={image.alt || "Image"}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      className={className}
    />
  );
};

export default ImageComponent;
