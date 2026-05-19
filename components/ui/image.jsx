import { urlFor } from "@/lib/sanity.image-url";
import Image from "next/image";

const ImageComponent = ({ image, className }) => {
  return (
    <Image
      src={urlFor(image).quality(100).url()}
      fill
      sizes="
        (max-width: 640px) 100vw,
         
      "
      alt={image.alt || "Image"}
      placeholder="blur"
      blurDataURL={image.asset.metadata.lqip}
      className={className}
    />
  );
};

export default ImageComponent;
