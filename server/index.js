import { Reaction } from "/server/api";
import SimpleLayout from "../lib/layout/simple";
import TwoColumnLayout from "../lib/layout/twoColumn";
import { ProductReviews } from "../lib/collection";
import { ProductReviews as ProductReviewsSchema } from "./schema";

ProductReviews.attachSchema(ProductReviewsSchema);

Reaction.registerTemplate({
  name: "productDetailSimple",
  title: "Product Detail Simple Layout With Reviews",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: SimpleLayout()
});

Reaction.registerTemplate({
  name: "productDetailTwoColumn",
  title: "Product Detail Two Column Layout With Reviews",
  type: "react",
  templateFor: ["pdp"],
  permissions: ["admin", "owner"],
  audience: ["anonymous", "guest"],
  template: TwoColumnLayout()
});
