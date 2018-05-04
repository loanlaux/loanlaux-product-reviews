import React, { Component } from "react";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "@reactioncommerce/reaction-components";
import { Meteor } from "meteor/meteor";
import { ProductReviewsComponent } from "../components";
import { ProductReviews } from "../../lib/collection";
import { ReactionProduct } from "/lib/api";

const wrapComponent = (Comp) => (
  class ProductReviewsContainer extends Component {
    render() {
      return (
        <Comp {...this.props} />
      );
    }
  }
);

function composer(props, onData) {
  const ProductReviewsSubscription = Meteor.subscribe("ProductReviews", ReactionProduct.selectedProductId());

  if (ProductReviewsSubscription.ready()) {
    const reviews = ProductReviews.find().fetch();

    onData(null, {
      reviews
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
