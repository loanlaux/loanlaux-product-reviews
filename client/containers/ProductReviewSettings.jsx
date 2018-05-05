import React, { Component } from "react";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";
import { Packages } from "/lib/collections";
import ProductReviewSettings from "../components/ProductReviewSettings";

const wrapComponent = (Comp) => (
  class ProductReviewSettingsContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        settings: props.packageSettings
      };
    }

    handleSwitchToggle = (event, isChecked, name) => {
      this.setState({
        settings: {
          public: {
            ...this.state.settings.public,
            [name]: isChecked
          }
        }
      }, () => Meteor.call("loanlaux/updateProductReviewSettings", this.state));
    };

    render() {
      return (
        <Comp
          onSwitchToggle={this.handleSwitchToggle}
          settings={this.state.settings.public}
        />
      );
    }
  }
);

function composer(props, onData) {
  if (Reaction.Subscriptions.Packages.ready()) {
    const packageSettings = Packages.findOne({ name: "loanlaux-product-reviews" }).settings;

    onData(null, {
      packageSettings
    });
  }
}

registerComponent("ProductReviewSettings", ProductReviewSettings, [
  composeWithTracker(composer),
  wrapComponent
]);

export default compose(
  composeWithTracker(composer),
  wrapComponent
)(ProductReviewSettings);
