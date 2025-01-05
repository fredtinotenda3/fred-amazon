import { OrderItem } from "@/types";
import { round2 } from "../utils";
import { FREE_IN_STORE_PICKUP } from "../constants";

export const calcDeliveryDateAndPrice = async ({
  items,
}: {
  deliveryDateIndex?: number;
  items: OrderItem[];
}) => {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const PickUp = itemsPrice > FREE_IN_STORE_PICKUP ? 0 : 0;
  const taxPrice = round2(itemsPrice * 0);
  const totalPrice = round2(
    itemsPrice +
      (PickUp ? round2(PickUp) : 0) +
      (taxPrice ? round2(taxPrice) : 0)
  );
  return {
    itemsPrice,
    PickUp,
    taxPrice,
    totalPrice,
  };
};
