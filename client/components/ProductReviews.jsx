import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import Stars from "./Stars";

class ProductReviews extends Component {
  render() {
    return (
      <div
        className="product-rating"
        itemProp="aggregateRating"
        itemType="http://schema.org/AggregateRating"
        itemScope
      >
        <hr />
        <h5>
          <span><span itemProp="ratingValue">4.67</span>/5 </span>
          <Stars />
        </h5>
        <p className="product-rating-count">Based on <span itemProp="ratingValue">23</span> customer reviews.</p>
      </div>
    );
  }
}

export default ProductReviews;

registerComponent("ProductReviews", ProductReviews);
