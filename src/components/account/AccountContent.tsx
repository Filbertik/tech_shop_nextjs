import Account from "./sections/Account";
import Address from "./sections/Address";
import Orders from "./sections/Orders";
import Wishlist from "./sections/Wishlist";

interface Props {
  active: string;
}

export default function AccountContent({ active }: Props) {
  return (
    <div className="w-[700px] min-h-[400px]">
      {active === "account" && <Account />}
      {active === "address" && <Address />}
      {active === "orders" && <Orders />}
      {active === "wishlist" && <Wishlist />}
    </div>
  );
}
