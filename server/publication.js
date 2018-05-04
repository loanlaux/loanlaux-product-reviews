import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductReviews } from "./collection";

Meteor.publish("ProductReviews", (productId) => {
  check(productId, String);

  return ProductReviews.find({
    productId
  });
});
