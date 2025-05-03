export const dynamic = "force-dynamic";
import ContactUsComponent from "@/components/ContactUs";
import React from "react";
export const metadata = {
  title: {
    default: "Contact Us",
    card: "summary_large_image",
  },
};
const ContactUs = () => {
  return (
    <div>
      <ContactUsComponent />
    </div>
  );
};

export default ContactUs;
