import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Reaction } from "/server/api";
import { ReactionProduct } from "/lib/api";
import { Orders, Packages } from "/lib/collections";
import { ProductReviews } from "../lib/collection";
import hasUserPurchasedProduct from "../lib/hasUserPurchasedProduct";

Meteor.methods({
  "loanlaux/submitProductReview": (rating, productId) => {
    check(rating, Number);
    check(productId, String);

    const userId = Meteor.userId();
    const { settings } = Reaction.getPackageSettings("loanlaux-product-reviews");
    const userOrders = Orders.find({ userId }).fetch();
    const currentProductId = ReactionProduct.selectedProductId();

    userHasPurchasedProduct = hasUserPurchasedProduct(userOrders, currentProductId);

    if (!settings.public.allowReviewsFromGuests &&
      !Reaction.hasPermission("account/profile", userId, Reaction.getShopId())) {

      throw new Meteor.Error("access-denied", "You need to be a member to review this product");
    }

    if (!settings.public.allowReviewsWithoutPurchasing && !userHasPurchasedProduct) {

      throw new Meteor.Error("access-denied", "You need to purchase this product to review it");
    }

    // If review exists for this user on this product, simply update the rating

    if (ProductReviews.find({ productId, userId }).count() > 0) {
      ProductReviews.update({ productId, userId }, {
        $set: {
          rating
        }
      });
    } else {
      // Otherwise, create a new review

      ProductReviews.insert({
        rating,
        productId,
        userId
      });
    }
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
