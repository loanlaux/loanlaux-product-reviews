import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { ProductReviews } from "../lib/collection";

Meteor.methods({
  "loanlaux/submitProductReview": (rating, productId) => {
    check(rating, Number);
    check(productId, String);

    ProductReviews.insert({
      rating,
      productId,
      userId: Meteor.userId()
    });
  }
});
