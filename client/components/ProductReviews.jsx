import React, { Component } from "react";
import PropTypes from "prop-types";
import Stars from "react-stars";

class ProductReviews extends Component {
  static propTypes = {
    averageRating: PropTypes.number,
    canSubmitReview: PropTypes.bool,
    onSubmitReview: PropTypes.func,
    reviewCount: PropTypes.number
  };

  render() {
    const {
      averageRating,
      canSubmitReview,
      onSubmitReview,
      reviewCount,
      userHasPurchasedProduct
    } = this.props;

    return (
      <div
        className="product-rating"
        itemProp="aggregateRating"
        itemType="http://schema.org/AggregateRating"
        itemScope
      >
        <hr />
        <div className="product-rating-value">
          <h5><span itemProp="ratingValue">{averageRating.toFixed(2)}</span>/5</h5>
          <Stars
            className="product-rating-stars"
            color="#efc95f"
            edit={canSubmitReview && userHasPurchasedProduct}
            onChange={onSubmitReview}
            value={averageRating}
          />
        </div>
        <p className="product-rating-count">
          Based on <span itemProp="ratingValue">{reviewCount}</span> customer review{reviewCount > 1 && "s"}.
        </p>
      </div>
    );
  }
}

export default ProductReviews;
