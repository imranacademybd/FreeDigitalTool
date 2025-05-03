"use client";
import { useState } from "react";
import { jsPDF } from "jspdf";

export default function ImageToPdfConverter() {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const convertToPdf = () => {
    if (!image) return alert("Please upload an image first!");

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;

      pdf.addImage(img, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("converted.pdf");
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Image to PDF Converter</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4 p-2 border rounded w-full"
        />
        {image && (
          <img
            src={image}
            alt="Preview"
            className="mb-4 max-w-full max-h-64 object-contain"
          />
        )}
        <button
          onClick={convertToPdf}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Convert to PDF
        </button>
      </div>
    </div>
  );
}
