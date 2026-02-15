import Image from './Image';

type ImageListProps = {
  images: string[];
  productname: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
};

const ImageList = ({
  images,
  productname,
  selectedImage,
  setSelectedImage,
}: ImageListProps) => {
  return (
    images &&
    images.length > 1 && (
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <Image
            image={image}
            index={index}
            productname={productname}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        ))}
      </div>
    )
  );
};

export default ImageList;
