import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import Api from "./Api"; // Assuming Api.js is in the same directory

const CsvUploader = () => {
  const [csvData, setCsvData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleCsvUpload = (data) => {
    const headers = data[0];
    setCsvData(data.slice(1));

    setSelectedColumns(headers.map((header) => ({ header, selected: "" })));
  };

  const handleColumnSelect = (index, selectedValue) => {
    setSelectedColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];
      updatedColumns[index].selected = selectedValue;
      return updatedColumns;
    });
  };

  const handleSubmitMapping = async () => {
    try {
      const mappingData = {
        csvData,
        columnMapping: selectedColumns,
      };

      // Use the Api.uploadCsv function to send CSV data to the backend
      const uploadResponse = await Api.uploadCsv(csvData);
      console.log("Upload response:", uploadResponse);

      // Use the Api.submitMapping function to send the mapping data to the backend
      const mappingResponse = await Api.submitMapping(mappingData);
      console.log("Mapping response:", mappingResponse);

      // Add any additional logic or feedback to the user as needed
    } catch (error) {
      // Handle errors appropriately
      console.error("Error submitting mapping:", error);
    }
  };

  return (
    <div>
      <h2>CSV Uploader</h2>
      <CSVReader onFileLoaded={handleCsvUpload} />

      {csvData.length > 0 && (
        <div>
          <h3>Column Mapping</h3>
          <table>
            <thead>
              <tr>
                <th>CSV Column</th>
                <th>Database Column</th>
              </tr>
            </thead>
            <tbody>
              {selectedColumns.map((column, index) => (
                <tr key={index}>
                  <td>{column.header}</td>
                  <td>
                    <select
                      value={column.selected}
                      onChange={(e) =>
                        handleColumnSelect(index, e.target.value)
                      }
                    >
                      <option value="">Select Database Column</option>
                      {/* Add dynamically generated options based on your database structure */}
                      <option value="name">Name</option>
                      <option value="class">Class</option>
                      <option value="school">School</option>
                      <option value="state">State</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={handleSubmitMapping}>Submit Mapping</button>
        </div>
      )}
    </div>
  );
};

export default CsvUploader;
