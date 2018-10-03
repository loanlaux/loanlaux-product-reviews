import Reaction from "/imports/plugins/core/core/server/Reaction";

Reaction.registerPackage({
  label: "Reviews",
  name: "loanlaux-product-reviews",
  icon: "fa fa-star",
  autoEnable: true,
  settings: {
    public: {
      allowReviewsFromGuests: false,
      allowReviewsWithoutPurchasing: false
    }
  },
  registry: [{
    label: "Product Reviews",
    name: "loanlaux-product-reviews",
    icon: "fa fa-star",
    provides: ["settings"],
    description: "Manage product review settings",
    template: "ProductReviewSettings"
  }]
});
