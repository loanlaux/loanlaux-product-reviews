import { ReactionProduct } from "/lib/api";

export default function (userOrders, currentProductId) {
  const userOrderItemIds = userOrders
    .reduce((orderItemIds, currentOrder) => [
      ...orderItemIds,
      ...currentOrder.items.map((currentItem) => currentItem.productId)
    ], []);

  return userOrderItemIds.includes(currentProductId);
}
