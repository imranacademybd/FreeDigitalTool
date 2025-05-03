// models/Contact.ts
import mongoose, { Schema} from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent model overwrite upon hot reloads in development

if (mongoose.models.Contact) {
  delete mongoose.models.Contact;
}

const Contact = mongoose.models.Contact ?? mongoose.model("Contact", ContactSchema);

export default Contact;
