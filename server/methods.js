import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/server/api";
import { Packages } from "/lib/collections";
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
  },

  "loanlaux/updateProductReviewSettings": (newSettings) => {
    check(newSettings, Object);

    const userId = Meteor.userId();

    if (!Reaction.hasPermission("admin", userId, Reaction.getShopId())) {
      throw new Meteor.Error("access-denied", "You need to be an admin to update product review settings");
    }

    Packages.update({ name: "loanlaux-product-reviews" }, {
      $set: {
        ...newSettings
      }
    });
  }
});
