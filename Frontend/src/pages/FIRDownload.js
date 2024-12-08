import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import Sidebar from '../components/Sidebar';
import MenuBar from '../components/MenuBar';
import Footer from '../components/Footer';

const FormToPDF = () => {
  // Initialize form data state
  const [formData, setFormData] = useState({
    district: '',
    policeStation: '',
    year: '',
    firNo: '',
    date: '',
    act1: '',
    sections1: '',
    act2: '',
    sections2: '',
    act3: '',
    sections3: '',
    otherActs: '',
    offenceDay: '',
    offenceDate: '',
    offenceTime: '',
    infoReceivedDate: '',
    infoReceivedTime: '',
    generalDiaryRef: '',
    typeOfInfo: '',
    occurrenceDirection: '',
    beatNo: '',
    address: '',
    outsidePS: '',
    complainantName: '',
    fatherName: '',
    birthDate: '',
    nationality: '',
    passportNo: '',
    passportIssueDate: '',
    passportIssuePlace: '',
    occupation: '',
    complainantAddress: '',
    accusedDetails: '',
    delayReason: '',
    stolenProperties: '',
    stolenValue: '',
    inquestReportNo: '',
    actionTaken: '',
    officerName: '',
    officerRank: '',
    officerNo: '',
    signature: '',
    dispatchDate: '',
    dispatchTime: ''
  });
  const [showDownloads, setShowDownloads] = useState(false);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Generate PDF from form data
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add centered heading to PDF
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold"); // Set font to bold

    // Add centered heading to PDF
    doc.text("FORM – IF1 - (Integrated Form)", 105, 20, { align: "center" });
    doc.text("FIRST INFORMATION REPORT", 105, 30, { align: "center" });

    // Set font size back to normal for other text
    doc.setFont("helvetica", "normal"); // Reset font to normal
    doc.text("(Under Section 154 Cr.P.C)", 105, 35, { align: "center" });

    // Adding the form fields to the PDF
    doc.setFontSize(10);

    // Function to draw underlined text
    const drawUnderlinedText = (text, x, y) => {
      doc.text(text, x, y); // Add the text
      const textWidth = doc.getTextWidth(text); // Get the width of the text
      doc.line(x, y + 1, x + textWidth, y + 1); // Draw an underline under the text
    };

    // Field definitions with labels and corresponding form data
    const fields = [
      { label: '1. Dist:', value: formData.district, y: 50 },
      { label: 'P.S:', value: formData.policeStation, y: 57 },
      { label: 'Year:', value: formData.year, y: 64 },
      { label: 'F.I.R. No:', value: formData.firNo, y: 71 },
      { label: 'Date:', value: formData.date, y: 78 },

      { label: '2. (i) *Act:', value: formData.act1, y: 85 },
      { label: '*Sections:', value: formData.sections1, y: 92 },
      { label: '(ii) *Act:', value: formData.act2, y: 99 },
      { label: '*Sections:', value: formData.sections2, y: 106 },
      { label: '(iii) *Act:', value: formData.act3, y: 113 },
      { label: '*Sections:', value: formData.sections3, y: 120 },
      { label: '(iv) *Other Acts & Sections:', value: formData.otherActs, y: 127 },

      { label: '3. (a) *Occurrence of Offence: *Day:', value: formData.offenceDay, y: 134 },
      { label: '*Date:', value: formData.offenceDate, y: 141 },
      { label: '*Time:', value: formData.offenceTime, y: 148 },

      { label: '(b) Information received at P.S. Date:', value: formData.infoReceivedDate, y: 155 },
      { label: 'Time:', value: formData.infoReceivedTime, y: 162 },

      { label: '(c) General Diary Reference: Entry No(s):', value: formData.generalDiaryRef, y: 169 },
      { label: 'Time:', value: formData.generalDiaryRef, y: 176 },

      { label: '4. Type of Information:', value: formData.typeOfInfo, y: 183 },

      { label: '5. Place of Occurrence:', value: formData.occurrenceDirection, y: 190 },
      { label: 'Beat No.:', value: formData.beatNo, y: 197 },
      { label: '*Address:', value: formData.address, y: 204 },

      { label: '(c) In case outside limit of this Police Station, P.S. Name:', value: formData.outsidePS, y: 211 },

      { label: '6. Complainant / Informant:', value: formData.complainantName, y: 218 },
      { label: 'Father\'s / Husband\'s Name:', value: formData.fatherName, y: 225 },
      { label: 'Date / Year of Birth:', value: formData.birthDate, y: 232 },
      { label: 'Nationality:', value: formData.nationality, y: 239 },
      { label: 'Passport No:', value: formData.passportNo, y: 246 },
      { label: 'Date of Issue:', value: formData.passportIssueDate, y: 253 },
      { label: 'Place of Issue:', value: formData.passportIssuePlace, y: 260 },
      { label: 'Occupation:', value: formData.occupation, y: 267 },
      { label: 'Address:', value: formData.complainantAddress, y: 274 },

      { label: '7. Details of known / suspected / unknown / accused:', value: formData.accusedDetails, y: 281 },
      { label: '8. Reasons for delay in reporting by the complainant / Informant:', value: formData.delayReason, y: 288 },
      { label: '9. Particulars of properties stolen / involved:', value: formData.stolenProperties, y: 295 }
    ];

    // Loop through the fields to add the labels and handle the data or dots
    fields.forEach(field => {
      doc.text(`${field.label}`, 20, field.y); // Add the label

      const fieldText = field.value || ""; // Use the field value or default to empty string
      drawUnderlinedText(fieldText, 120, field.y); // Increase the X-axis (from 60 to 70) to move the value to the right
    });

    // Add second page after point 9
    doc.addPage();

    // Continue adding the remaining form data on the second page
    const secondPageFields = [
      { label: '10. *Total value of the properties stolen/involved:', value: formData.stolenValue, y: 10 },
      { label: '11. *Inquest Report / U.D. Case No., if any:', value: formData.inquestReportNo, y: 17 },
      { label: '12. F.I.R. Contents:', value: formData.actionTaken, y: 24 },
      { label: '13. Action taken:', value: formData.actionTaken, y: 31 },
      { label: '14. Signature / Thumb-impression of the complainant / informant:', value: formData.signature, y: 38 },
      { label: '15. Date & time of despatch to the court:', value: formData.dispatchDate + " " + formData.dispatchTime, y: 45 }
    ];

    // Loop through the fields to add the labels and handle the data or dots for the second page
    secondPageFields.forEach(field => {
      doc.text(`${field.label}`, 20, field.y); // Add the label

      const fieldText = field.value || ""; // Use the field value or default to empty string
      drawUnderlinedText(fieldText, 120, field.y); // Increase the X-axis (from 60 to 70) to move the value to the right
    });

    // Save PDF
    doc.save('FIR_report.pdf');
  };
  const displayPDF = () => {
    return (
      <div className="pdf-container">
        <embed
          src="/FIR.pdf" // Path to the PDF file in the public folder
          width="100%"
          height="600px"
          type="application/pdf"
        />
      </div>
    );
  };


  return (
    <div className="bareacts-container min-h-screen flex flex-col">
      {isMobile ? <MenuBar /> : <Sidebar />}

      <main className="main-content flex-grow p-8 bg-gray-100 min-h-screen">
        <h2 className="text-4xl font-semibold text-blue-900 text-center mb-8 mt-8">
          FIR Builder
        </h2>

        {/* Toggle Buttons for PDF and Original Formats */}
        <div className="toggle-section flex justify-center mb-6">
          <button
            onClick={() => setShowDownloads(false)}
            className={`p-4 rounded-l-lg border font-medium transition-all duration-300 ease-in-out ${!showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
              }`}
          >
            Reference PDF Builder
          </button>
          <button
            onClick={() => setShowDownloads(true)}
            className={`p-4 rounded-r-lg border font-medium transition-all duration-300 ease-in-out ${showDownloads
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-200 text-gray-600 transform scale-100"
              }`}
          >
            Original Format
          </button>
        </div>

        {/* Conditionally Render Content Based on Toggle */}
        <div className="content-section">
          {!showDownloads ? (
            <>
              <h2 className="text-3xl font-semibold text-black-900 text-center mb-8 mt-8">
                Standard Input Form
              </h2>
              <div className="flex justify-center items-center"> {/* Center the whole container */}
                <div className="relative group inline-flex items-center">
                  <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
                    <i className="fas fa-info-circle"></i> {/* Info icon */}
                  </button>
                  <div className="absolute left-full ml-2 w-48 bg-gray-800 text-white text-sm rounded py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p>This form will display you a Dummy of the actual FIR for smooth actual Referencing Purpose</p> {/* Replace this with the actual info */}
                  </div>
                </div>
              </div>
              <form className="space-y-6 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                {/* Section 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">District:</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Police Station:</label>
                    <input
                      type="text"
                      name="policeStation"
                      value={formData.policeStation}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Year:</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Reference Number:</label>
                    <input
                      type="text"
                      name="referenceNumber"
                      value={formData.referenceNumber}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Date:</label>
                    <input
                      type="text"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* Section 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">Act:</label>
                    <input
                      type="text"
                      name="act"
                      value={formData.act}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Sections:</label>
                    <input
                      type="text"
                      name="sections"
                      value={formData.sections}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* Section 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">Occurrence Date:</label>
                    <input
                      type="text"
                      name="occurrenceDate"
                      value={formData.occurrenceDate}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Occurrence Time:</label>
                    <input
                      type="text"
                      name="occurrenceTime"
                      value={formData.occurrenceTime}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* Section 4 */}
                <div>
                  <label className="block text-gray-700 font-medium">Information Type:</label>
                  <input
                    type="text"
                    name="infoType"
                    value={formData.infoType}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 5 */}
                <div>
                  <label className="block text-gray-700 font-medium">Place of Occurrence:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium">Direction and Distance:</label>
                      <input
                        type="text"
                        name="occurrenceDirection"
                        value={formData.occurrenceDirection}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium">Beat Number:</label>
                      <input
                        type="text"
                        name="beatNo"
                        value={formData.beatNo}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Address:</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
                {/* Section 6 */}
                <div>
                  <label className="block text-gray-700 font-medium">Complainant Name:</label>
                  <input
                    type="text"
                    name="complainantName"
                    value={formData.complainantName}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Father's / Husband's Name:</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Date / Year of Birth:</label>
                  <input
                    type="text"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Nationality:</label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Occupation:</label>
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">Address:</label>
                  <input
                    type="text"
                    name="complainantAddress"
                    value={formData.complainantAddress}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 7 */}
                <div>
                  <label className="block text-gray-700 font-medium">Details of Accused:</label>
                  <textarea
                    name="accusedDetails"
                    value={formData.accusedDetails}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 8 */}
                <div>
                  <label className="block text-gray-700 font-medium">Reasons for Delay in Reporting:</label>
                  <textarea
                    name="delayReason"
                    value={formData.delayReason}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 9 */}
                <div>
                  <label className="block text-gray-700 font-medium">Particulars of Stolen/Involved Property:</label>
                  <textarea
                    name="stolenProperties"
                    value={formData.stolenProperties}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 10 */}
                <div>
                  <label className="block text-gray-700 font-medium">Total Value of Property Stolen/Involved:</label>
                  <input
                    type="text"
                    name="stolenValue"
                    value={formData.stolenValue}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 11 */}
                <div>
                  <label className="block text-gray-700 font-medium">Inquest Report / Case Number:</label>
                  <input
                    type="text"
                    name="inquestReportNo"
                    value={formData.inquestReportNo}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 12 */}
                <div>
                  <label className="block text-gray-700 font-medium">Action Taken:</label>
                  <textarea
                    name="actionTaken"
                    value={formData.actionTaken}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 13 */}
                <div>
                  <label className="block text-gray-700 font-medium">Signature of Complainant:</label>
                  <input
                    type="text"
                    name="signature"
                    value={formData.signature}
                    onChange={handleChange}
                    className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                  />
                </div>
                {/* Section 14 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium">Dispatch Date:</label>
                    <input
                      type="text"
                      name="dispatchDate"
                      value={formData.dispatchDate}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium">Dispatch Time:</label>
                    <input
                      type="text"
                      name="dispatchTime"
                      value={formData.dispatchTime}
                      onChange={handleChange}
                      className="mt-2 p-3 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={generatePDF}
                  className="w-full py-3 mt-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                >
                  Download as PDF
                </button>
              </form>
            </>
          ) : (
            <div className="original-formats">
              <h3 className="text-3xl font-semibold text-black-900 text-center mb-8 mt-8">Original Format</h3>
              <p className="text-center mb-8">
                The Official Format of the FIR as of 5th December, 2024.
              </p>
              {/* PDF Display */}
              <div className="pdf-container mx-auto my-8 max-w-4xl p-4 border-2 border-gray-300 rounded-lg shadow-md">
                <embed
                  src="/FIR.pdf" // Path to the PDF file in the public folder
                  width="100%"
                  height="600px"
                  type="application/pdf"
                />
              </div>
            </div>
          )}
        </div>
      </main>
     {/*Footer Section*/}
      <Footer />
    </div>
  );
};

export default FormToPDF;
