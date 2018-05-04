import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

class ProductReviews extends Component {
  render() {
    return (
      <h1>Product reviews go here</h1>
    );
  }
}

export default ProductReviews;

registerComponent("ProductReviews", ProductReviews);
