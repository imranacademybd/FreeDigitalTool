// app/admin/contacts/[id]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/db";
import Contact from "@/models/contactUs";



export const metadata = {
  title: "Admin — Contact Details",
};

const ContactDetails = async ({ params }) => {
  const { id } = await params;
  await dbConnect();

  const contact = await Contact.findById(id).lean();
  if (!contact) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 text-seo-second-color">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-seo-first-color">
          Contact Details
        </h1>
      </header>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium text-seo-forth-color">Name</h2>
          <p>{contact.name}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-seo-forth-color">Email</h2>
          <p>{contact.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-seo-forth-color">Message</h2>
          <p className="whitespace-pre-wrap">{contact.message}</p>
        </div>
        <div>
          <h2 className="text-xl font-medium text-seo-forth-color">
            Submitted At
          </h2>
          <p>{new Date(contact.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
