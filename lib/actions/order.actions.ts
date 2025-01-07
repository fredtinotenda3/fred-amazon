// import { OrderItem, ShippingAddress } from "@/types";
// import { getSetting } from "./setting.actions";
// import { round2 } from "../utils";

// export const calcDeliveryDateAndPrice = async ({
//   items,
//   shippingAddress,
//   deliveryDateIndex,
// }: {
//   deliveryDateIndex?: number;
//   items: OrderItem[];
//   shippingAddress?: ShippingAddress;
// }) => {
//   const { availableDeliveryDates = [] } = await getSetting();

//   if (
//     !Array.isArray(availableDeliveryDates) ||
//     availableDeliveryDates.length === 0
//   ) {
//     console.error("Delivery dates are unavailable.");
//     throw new Error("No delivery dates found.");
//   }

//   const itemsPrice = round2(
//     items.reduce((acc, item) => acc + item.price * item.quantity, 0)
//   );

//   const deliveryDate =
//     availableDeliveryDates[
//       deliveryDateIndex === undefined
//         ? availableDeliveryDates.length - 1
//         : deliveryDateIndex
//     ];

//   const shippingPrice =
//     !shippingAddress || !deliveryDate
//       ? undefined
//       : deliveryDate.freeShippingMinPrice > 0 &&
//         itemsPrice >= deliveryDate.freeShippingMinPrice
//       ? 0
//       : deliveryDate.shippingPrice;

//   const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15);

//   const totalPrice = round2(
//     itemsPrice +
//       (shippingPrice ? round2(shippingPrice) : 0) +
//       (taxPrice ? round2(taxPrice) : 0)
//   );

//   return {
//     availableDeliveryDates,
//     deliveryDateIndex:
//       deliveryDateIndex === undefined
//         ? availableDeliveryDates.length - 1
//         : deliveryDateIndex,
//     itemsPrice,
//     shippingPrice,
//     taxPrice,
//     totalPrice,
//   };
// };

import { OrderItem, ShippingAddress } from "@/types";
import { round2 } from "../utils";
import { AVAILABLE_DELIVERY_DATES } from "../constants";

export const calcDeliveryDateAndPrice = async ({
  items,
  shippingAddress,
  deliveryDateIndex,
}: {
  deliveryDateIndex?: number;
  items: OrderItem[];
  shippingAddress?: ShippingAddress;
}) => {
  // const { availableDeliveryDates } = await getSetting()
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  const deliveryDate =
    AVAILABLE_DELIVERY_DATES[
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex
    ];
  const shippingPrice =
    !shippingAddress || !deliveryDate
      ? undefined
      : deliveryDate.freeShippingMinPrice > 0 &&
        itemsPrice >= deliveryDate.freeShippingMinPrice
      ? 0
      : deliveryDate.shippingPrice;

  const taxPrice = !shippingAddress ? undefined : round2(itemsPrice * 0.15);
  const totalPrice = round2(
    itemsPrice +
      (shippingPrice ? round2(shippingPrice) : 0) +
      (taxPrice ? round2(taxPrice) : 0)
  );
  return {
    AVAILABLE_DELIVERY_DATES,
    deliveryDateIndex:
      deliveryDateIndex === undefined
        ? AVAILABLE_DELIVERY_DATES.length - 1
        : deliveryDateIndex,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  };
};
