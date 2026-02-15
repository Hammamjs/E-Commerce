type InstockStatusProps = { inStock: number };

export default function InstockStatus({ inStock }: InstockStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      <div
        className={`w-3 h-3 rounded-full ${
          inStock > 0 ? 'bg-green-500' : 'bg-red-500'
        }`}
      />
      <span className={inStock > 0 ? 'text-green-600' : 'text-red-600'}>
        {inStock > 0 ? `${inStock} in stock` : 'Out of Stock'}
      </span>
    </div>
  );
}
