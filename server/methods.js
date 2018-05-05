import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/server/api";
import { ProductReviews } from "../lib/collection";

Meteor.methods({
  "loanlaux/submitProductReview": (rating, productId) => {
    check(rating, Number);
    check(productId, String);

    const userId = Meteor.userId();

    if (!Reaction.hasPermission("account/profile", userId, Reaction.getShopId())) {
      throw new Meteor.Error("access-denied", "You need to be a member to review this product");
    }

    ProductReviews.insert({
      rating,
      productId,
      userId
    });
  }
});
