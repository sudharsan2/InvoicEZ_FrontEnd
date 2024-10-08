import React, { useState } from "react";
import Search from "./Search"; // Make sure to import your Search component
import ApproveTable from "./ApproveTable"; // Make sure to import your ApproveTable component

const SearchValue = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const items = [
        {
          file: { label: "13456" },
          author: { label: "Bluetech" },
          lastUpdated: { label: "chennai", timestamp: 1 },
          lastUpdate: { label: "12/03/2024" },
          TotalAmount: { label: "15000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13459" },
          author: { label: "Facebook" },
          lastUpdated: { label: "chennai", timestamp: 2 },
          lastUpdate: { label: "17/04/2024" },
          TotalAmount: { label: "15000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13465" },
          author: { label: "Intel" },
          lastUpdated: { label: "coimbatore", timestamp: 2 },
          lastUpdate: { label: "17/05/2024" },
          TotalAmount: { label: "16000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13466" },
          author: { label: "Shar_Supplier" },
          lastUpdated: { label: "Salem", timestamp: 3 },
          lastUpdate: { label: "27/06/2024" },
          TotalAmount: { label: "18000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13472" },
          author: { label: "Google" },
          lastUpdated: { label: "Madurai", timestamp: 3 },
          lastUpdate: { label: "7/04/2024" },
          TotalAmount: { label: "25000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13477" },
          author: { label: "Levin Technologies" },
          lastUpdated: { label: "Coimbatore", timestamp: 3 },
          lastUpdate: { label: "27/08/2024" },
          TotalAmount: { label: "45000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
        {
          file: { label: "13489" },
          author: { label: "Jane Doe" },
          lastUpdated: { label: "Chennai", timestamp: 3 },
          lastUpdate: { label: "17/10/2024" },
          TotalAmount: { label: "35000 INR" },
          InvoiceDate: { label: "12/03/2024" },
        },
      ];
      

    
    const filteredItems = items.filter(item =>
        item.author.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lastUpdated.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.file.label.includes(searchTerm)
    );

    return (
        <div>
            <Search
                label="Search"
                onSearchChange={setSearchTerm} 
            />
            <ApproveTable items={filteredItems} /> 
        </div>
    );
};

export default SearchValue;
