import { check } from "meteor/check";
import { Tracker } from "meteor/tracker";
import SimpleSchema from "simpl-schema";
import { registerSchema } from "@reactioncommerce/schemas";

export const ProductReviews = new SimpleSchema({
  userId: {
    type: String
  },
  productId: {
    type: String
  },
  rating: {
    type: Number
  }
}, { check, tracker: Tracker });

registerSchema("ProductReviews", ProductReviews);
