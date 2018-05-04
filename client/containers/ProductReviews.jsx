import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Meteor } from "meteor/meteor";
import { ProductReviewsComponent } from "../components";
import { ProductReviews } from "../../lib/collection";
import { ReactionProduct } from "/lib/api";

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
      return (
        <Comp
          onSubmitReview={this.handleSubmitReview}
          {...this.props}
        />
      );
    }
  }
);

function composer(props, onData) {
  const ProductReviewsSubscription = Meteor.subscribe("ProductReviews", ReactionProduct.selectedProductId());

  if (ProductReviewsSubscription.ready()) {
    const reviews = ProductReviews.find().fetch();
    const reviewCount = reviews.length;

    const averageRating = reviews
      .map((currentReview) => currentReview.rating)
      .reduce((ratingSum, currentRating) => ratingSum + currentRating, 0) / reviewCount;

    onData(null, {
      averageRating: averageRating || 0,
      reviewCount
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
