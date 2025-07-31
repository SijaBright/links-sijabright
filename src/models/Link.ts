import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILink extends Document {
  title: string;
  href: string;
  icon: string;
  order?: number;
}

const LinkSchema: Schema<ILink> = new Schema({
  title: { type: String, required: true },
  href: { type: String, required: true },
  icon: { type: String },
  order: { type: Number, default: 0 },
});

const Link: Model<ILink> =
  mongoose.models.Link || mongoose.model<ILink>("Link", LinkSchema);

export default Link;