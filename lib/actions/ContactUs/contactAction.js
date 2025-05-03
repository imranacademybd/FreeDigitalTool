// app/actions/contactAction.ts
"use server";

import dbConnect from "@/lib/db";
import Contact from "@/models/contactUs";
import { contactFormSchema } from "@/schemas/contactFormSchema";

function parseServerResponse(data) {
  return JSON.parse(JSON.stringify(data));
}

export const saveContact = async (formData) => {
  await dbConnect();

  try {
    // Extract fields from the FormData
    const raw = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validate incoming data
    const validated = contactFormSchema.parse(raw);

    // Save to MongoDB
    const contact = new Contact(validated);
    await contact.save();

    return parseServerResponse({
      status: "SUCCESS",
      message: "Contact saved.",
    });
  } catch (err) {
    console.error("Contact save error:", err);
    // Zod error?
    if (err.name === "ZodError") {
      return parseServerResponse({
        status: "ERROR",
        errors: err.errors,
      });
    }
    return parseServerResponse({
      status: "ERROR",
      message: err.message || "Unknown error",
    });
  }
};

/** Delete a single contact by ID */
export const deleteContact = async (id) => {
  await dbConnect();
  try {
    const deleted = await Contact.findByIdAndDelete(id);
    if (!deleted) {
      return parseServerResponse({
        status: "ERROR",
        message: "Contact not found",
      });
    }
    return parseServerResponse({
      status: "SUCCESS",
      message: "Contact deleted successfully",
    });
  } catch (err) {
    console.error("Delete contact error:", err);
    return parseServerResponse({
      status: "ERROR",
      message: err.message || "Failed to delete contact",
    });
  }
};

/** Delete multiple contacts by an array of IDs */
export const deleteMultipleContacts = async (ids) => {
  await dbConnect();
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return parseServerResponse({
        status: "ERROR",
        message: "No IDs provided for deletion",
      });
    }
    const result = await Contact.deleteMany({ _id: { $in: ids } });
    return parseServerResponse({
      status: "SUCCESS",
      message: `${result.deletedCount} contact${
        result.deletedCount === 1 ? "" : "s"
      } deleted`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("Bulk delete contacts error:", err);
    return parseServerResponse({
      status: "ERROR",
      message: err.message || "Failed to delete contacts",
    });
  }
};
