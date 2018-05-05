import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { ProductReviewsComponent } from "../components";
import { ProductReviews } from "../../lib/collection";
import { ReactionProduct } from "/lib/api";
import { Reaction } from "/client/api";
import { Orders } from "/lib/collections";

const wrapComponent = (Comp) => (
  class ProductReviewsContainer extends Component {
    static propTypes = {
      averageRating: PropTypes.number,
      reviewCount: PropTypes.number
    };

    handleSubmitReview = (rating) => {
      Meteor.call("loanlaux/submitProductReview", rating, ReactionProduct.selectedProductId());
    };

    render() {
      const canSubmitReview = Reaction.hasPermission("account/profile", Meteor.userId(), Reaction.getShopId());

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

  if (productReviewsSubscription.ready() && accountOrdersSubscription.ready()) {
    const reviews = ProductReviews.find().fetch();
    const reviewCount = reviews.length;

    const averageRating = reviews
      .map((currentReview) => currentReview.rating)
      .reduce((ratingSum, currentRating) => ratingSum + currentRating, 0) / reviewCount;

    const userOrders = Orders.find().fetch();

    const userOrderItemIds = userOrders
      .reduce((orderItemIds, currentOrder) => [
        ...orderItemIds,
        ...currentOrder.items.map((currentItem) => currentItem.productId)
      ], []);

    const currentProductId = ReactionProduct.selectedProductId();

    const userHasPurchasedProduct = userOrderItemIds.includes(currentProductId);

    onData(null, {
      averageRating: averageRating || 0,
      reviewCount,
      userHasPurchasedProduct
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
