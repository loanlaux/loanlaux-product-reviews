import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { ReactionProduct } from "/lib/api";
import { Reaction } from "/client/api";
import { Orders, Packages } from "/lib/collections";
import { ProductReviewsComponent } from "../components";
import { ProductReviews } from "../../lib/collection";

const wrapComponent = (Comp) => (
  class ProductReviewsContainer extends Component {
    static propTypes = {
      allowReviewsFromGuests: PropTypes.bool,
      allowReviewsWithoutPurchasing: PropTypes.bool,
      averageRating: PropTypes.number,
      reviewCount: PropTypes.number,
      userHasPurchasedProduct: PropTypes.bool
    };

    handleSubmitReview = (rating) => {
      Meteor.call("loanlaux/submitProductReview", rating, ReactionProduct.selectedProductId());
    };

    render() {
      const {
        allowReviewsFromGuests,
        allowReviewsWithoutPurchasing,
        userHasPurchasedProduct
      } = this.props;

      const canSubmitReview = (Reaction.hasPermission("account/profile", Meteor.userId(), Reaction.getShopId()) ||
        allowReviewsFromGuests) && (userHasPurchasedProduct || allowReviewsWithoutPurchasing);

      return (
        <Comp
          canSubmitReview={canSubmitReview}
          onSubmitReview={this.handleSubmitReview}
          {...this.props}
        />
      );
    }
  }
);

function composer(props, onData) {
  const productReviewsSubscription = Meteor.subscribe("ProductReviews", ReactionProduct.selectedProductId());
  const accountOrdersSubscription = Meteor.subscribe("AccountOrders", Meteor.userId());
  const packageSubscription = Meteor.subscribe("Packages", Reaction.getShopId());

  if (productReviewsSubscription.ready() && accountOrdersSubscription.ready() && packageSubscription.ready()) {
    const packageSettings = Packages.findOne({ name: "loanlaux-product-reviews" }).settings.public;

    let userHasPurchasedProduct;

    const reviews = ProductReviews.find().fetch();
    const reviewCount = reviews.length;

    const averageRating = reviews
      .map((currentReview) => currentReview.rating)
      .reduce((ratingSum, currentRating) => ratingSum + currentRating, 0) / reviewCount;

    if (!packageSettings.allowReviewsWithoutPurchasing) {
      const userOrders = Orders.find().fetch();

      const userOrderItemIds = userOrders
        .reduce((orderItemIds, currentOrder) => [
          ...orderItemIds,
          ...currentOrder.items.map((currentItem) => currentItem.productId)
        ], []);

      const currentProductId = ReactionProduct.selectedProductId();

      userHasPurchasedProduct = userOrderItemIds.includes(currentProductId);
    }

    onData(null, {
      averageRating: averageRating || 0,
      reviewCount,
      userHasPurchasedProduct,
      ...packageSettings
    });
  }
}

export default compose(
  composeWithTracker(composer),
  wrapComponent
)(ProductReviewsComponent);

registerComponent("ProductReviews", ProductReviewsComponent, [
  composeWithTracker(composer),
  wrapComponent
]);
