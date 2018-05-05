import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/server/api";
import { Orders, Packages } from "/lib/collections";
import { ProductReviews } from "../lib/collection";
import hasUserPurchasedProduct from "../lib/hasUserPurchasedProduct";
import { ReactionProduct } from "/lib/api";

Meteor.methods({
  "loanlaux/submitProductReview": (rating, productId) => {
    check(rating, Number);
    check(productId, String);

    const userId = Meteor.userId();
    const packageSettings = Reaction.getPackageSettings("loanlaux-product-reviews");
    const userOrders = Orders.find({ userId }).fetch();
    const currentProductId = ReactionProduct.selectedProductId();

    userHasPurchasedProduct = hasUserPurchasedProduct(userOrders, currentProductId);

    if (!packageSettings.public.allowReviewsFromGuests &&
      !Reaction.hasPermission("account/profile", userId, Reaction.getShopId())) {

      throw new Meteor.Error("access-denied", "You need to be a member to review this product");
    }

    if (!packageSettings.public.allowReviewsWithoutPurchasing && !userHasPurchasedProduct) {

      throw new Meteor.Error("access-denied", "You need to purchase this product to review it");
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
