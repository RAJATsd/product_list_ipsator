interface ProductImageHolderProps {
  imgSrc: string;
  altText: string;
}

const ProductImageHolder = ({ imgSrc, altText }: ProductImageHolderProps) => {
  return (
    <div className="h-72 bg-gray-300">
      {imgSrc && (
        <img
          className="w-full h-full object-cover"
          src={imgSrc}
          alt={altText}
        />
      )}
    </div>
  );
};

export default ProductImageHolder;
