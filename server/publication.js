import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductReviews } from "../lib/collection";

Meteor.publish("ProductReviews", (productId) => {
  check(productId, String);

  return ProductReviews.find({
    productId
  });
});
