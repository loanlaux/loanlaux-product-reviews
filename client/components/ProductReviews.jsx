import React, { Component } from "react";
import PropTypes from "prop-types";
import Stars from "react-stars";

class ProductReviews extends Component {
  static propTypes = {
    averageRating: PropTypes.number,
    reviewCount: PropTypes.number
  };

  render() {
    const { averageRating, reviewCount } = this.props;

    return (
      <div
        className="product-rating"
        itemProp="aggregateRating"
        itemType="http://schema.org/AggregateRating"
        itemScope
      >
        <hr />
        <div className="product-rating-value">
          <h5><span itemProp="ratingValue">{averageRating}</span>/5</h5>
          <Stars
            className="product-rating-stars"
            color="#efc95f"
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
