type UserPreferenceProps = {
  orderLength: number;
  favoritesLength: number;
  cartItemsLength: number;
};

const UserPreference = ({
  orderLength,
  favoritesLength,
  cartItemsLength,
}: UserPreferenceProps) => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 text-center">
      <div>
        <div className="text-lg font-bold text-primary">{orderLength}</div>
        <div className="text-xs text-foreground/60">Orders</div>
      </div>
      <div>
        <div className="text-lg font-bold text-primary">{favoritesLength}</div>
        <div className="text-xs text-foreground/60">Favorites</div>
      </div>
      <div>
        <div className="text-lg font-bold text-primary">{cartItemsLength}</div>
        <div className="text-xs text-foreground/60">Cart Items</div>
      </div>
    </div>
  );
};

export default UserPreference;
