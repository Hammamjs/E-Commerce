import CustomImage from '../shared/customImg';

type ImageProps = {
  index: number;
  image: string;
  productname: string;
  selectedImage: number;
  setSelectedImage: (index: number) => void;
};

function Image({
  image,
  index,
  productname,
  setSelectedImage,
  selectedImage,
}: ImageProps) {
  return (
    <button
      onClick={() => setSelectedImage(index)}
      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
        selectedImage === index ? 'border-primary' : 'border-border'
      }`}
    >
      <CustomImage img={image} productName={productname} />
    </button>
  );
}

export default Image;
