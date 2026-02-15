import ImageList from './ImageList';

type ProductImagesProps = {
  images: string[];
  selectedImage: number;
  image: string;
  productname: string;
  setSelectedImage: (idx: number) => void;
};

const ProductImages = ({
  images,
  selectedImage,
  productname,
  image,
  setSelectedImage,
}: ProductImagesProps) => {
  return (
    <div className="space-y-4">
      <div className="aspect-square overflow-hidden rounded-lg bg-card">
        <img
          loading="lazy"
          src={images?.[selectedImage] || image}
          alt={productname}
          className="w-full h-full object-cover"
        />
      </div>
      <ImageList
        images={images}
        productname={productname}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ProductImages;
