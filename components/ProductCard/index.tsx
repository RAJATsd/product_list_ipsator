import ProductImageHolder from "../ProductImageHolder";
interface ProductCardProps {
  title: string;
  description: string;
  poster: string;
  price: number;
}

const ProductCard = ({
  title,
  description,
  poster,
  price,
}: ProductCardProps) => {
  return (
    <div className="rounded-lg shadow-md overflow-hidden cursor-pointer relative">
      <ProductImageHolder imgSrc={poster} altText={`${title} poster`} />
      <div className="p-2">
        <div className="flex justify-between gap-x-2">
          <div className="whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-700 font-medium">
            {title}
          </div>
          <div>($ {price})</div>
        </div>
        <div className="mt-5 line-clamp-2 ">{description}</div>
      </div>
    </div>
  );
};

export default ProductCard;
