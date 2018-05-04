import React, { Component } from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";

class Stars extends Component {
  render() {
    return (
      <span className="product-rating-stars">
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star-half" />
      </span>
    );
  }
}

export default Stars;

registerComponent("ReviewStars", Stars);
