const ProductImageHolder = ({ imgSrc, altText }) => {
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
