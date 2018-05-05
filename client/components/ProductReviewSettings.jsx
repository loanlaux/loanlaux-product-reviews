import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardGroup } from "/imports/plugins/core/ui/client/components";
import { Components } from "/imports/plugins/core/components/lib";

class ProductReviewSettings extends Component {
  render() {
    const { onSwitchToggle, settings } = this.props;
    return (
      <CardGroup>
        <Card>
          <CardHeader
            i18nKeyTitle="review-settings"
            title="Review settings"
            actAsExpander
          />
          <CardBody expandable>
            <div className="panel-group">
              <Components.Switch
                name={"allowReviewsWithoutPurchasing"}
                label={"Allow reviews without purchasing product"}
                checked={settings.allowReviewsWithoutPurchasing}
                onChange={onSwitchToggle}
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p>This plugin is brought to you by <a href="https://loanlaux.com">Loan Laux</a>.</p>
            <p>Your project deserves an expert! Hire me for Reaction Commerce consulting and training:</p>
            <ul>
              <li><a href="tel:+16469680818">(646) 968-0818</a>‬ (United States)</li>
              <li><a href="tel:+16472437378">(647) 243-7378</a>‬ (Canada)</li>
              <li><a href="mailto:contact@loanlaux.com">contact@loanlaux.com</a></li>
            </ul>
          </CardBody>
        </Card>
      </CardGroup>
    );
  }
}

export default ProductReviewSettings;
