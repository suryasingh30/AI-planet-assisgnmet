import React, { useState } from "react";


const Navbar = ({ onFileChange }) => {
  // State to store the file name
  const [fileName, setFileName] = useState("");

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Set the file name when a file is selected
      if (onFileChange) onFileChange(event); // Optional: if you want to pass the file to parent component
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#D3D3D3",
        borderBottom: "1px solid #ccc",
        width: "100vw",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo and Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/AI Planet.png" // Replace with your AIplane logo URL
          alt="AIplane Logo"
          style={{
            width: "110px",
            height: "60px",
            marginRight: "10px",
          }}
        />
      </div>

      {/* File Upload Button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Conditionally display file name if a file is uploaded */}
        {fileName && (
          <span
            style={{
              fontSize: "16px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            {fileName}
          </span>
        )}

        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange} // Use the handler to update file name
          style={{
            display: "none", // Hide the default file input
          }}
        />
        <label
          htmlFor="fileInput"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "#0056b3") // Hover effect
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "#007bff") // Reset hover effect
          }
          onMouseDown={(e) =>
            (e.target.style.backgroundColor = "#003f7f") // Active effect
          }
          onMouseUp={(e) =>
            (e.target.style.backgroundColor = "#0056b3") // Reset active effect
          }
        >
          Upload PDF
        </label>
      </div>
    </nav>
  );
};

export default Navbar;
