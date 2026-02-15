import { useUserStore } from '@/stores/user/useUserStore';

type ProductReviewsProps = {
  productId: string;
};

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const userId = useUserStore((state) => state.user?._id);
  return (
    userId && (
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8">Reviews</h2>
        <ProductReviews productId={productId} />
      </div>
    )
  );
}
