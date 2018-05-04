import { Mongo } from "meteor/mongo";
import ProductReviewsSchema from "../server/schema";

export const ProductReviews = new Mongo.Collection("ProductReviews");

ProductReviews.attachSchema(ProductReviewsSchema);
