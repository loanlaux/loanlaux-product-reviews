import React, { Component } from "react";
import { compose } from "recompose";
import { registerComponent, composeWithTracker } from "/imports/plugins/core/components/lib";
import { Reaction } from "/client/api";
import ProductReviewSettings from "../components/ProductReviewSettings";

const wrapComponent = (Comp) => (
  class ProductReviewSettingsContainer extends Component {
    constructor(props) {
      super(props);

      this.state = {
        settings: props.packageInfo.settings
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
      });
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
    const packageInfo = Reaction.getPackageSettings("loanlaux-product-reviews");

    onData(null, {
      packageInfo
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
