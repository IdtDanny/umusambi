import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';


const PdfpaymentReport = ({ info, setShow }) => {
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        pdfExportComponent.current.save();
    };
    
    const handlePrint = () => {
        const printableContent = document.getElementById('printable-content');
        const originalContent = document.body.innerHTML;
      
        // Apply print-specific styles (hide non-printable content)
        document.body.innerHTML = printableContent.innerHTML;
      
        // Print the content
        window.print();
      
        // Restore the original content
        document.body.innerHTML = originalContent;
      };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);
    useEffect(() => {
        handlePrint();
        setShow();
    }, []);

    return (
        <div id="printable-content">
            <PDFExport ref={pdfExportComponent} paperSize="A4">
                <div style={{ textAlign: 'center', margin: '20px' }}>
                    {/* Logo */}
                    <img src={require("../assets/img/UmusambiLogo.jpg")} alt="Logo" style={{ width: '100px', height: '100px' }} />
                    <div style={{ marginTop: '10px' }}>
                        <h1 style={{ color: 'black', margin: '0', padding: '10px 0' }}>
                            <em>UMUSAMBI VILLAGE SYSTEM</em>
                        </h1>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kigali, Rwanda</p>
                        <p style={{ margin: '0', fontSize: '14px' }}>Kabuga, Gasabo</p>
                    </div>
                    <hr />
                    <h2>Payment report</h2>
                    <hr />
                    <h3>Report on {formattedDate}</h3>
                </div>
                <h3>Visitors</h3>
                <div style={{ margin: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>First name</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Last name</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info.visitors.map((data, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.visitor.firstname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.visitor.lastname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.fees}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3>Total amount received</h3>
                <table style={{ margin: '20px auto', borderCollapse: 'collapse', border: '1px solid black' }}>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px' }}>Total Amount</td>
                            <td style={{ border: '1px solid black', padding: '8px' }}>{info.totalPayments}</td> {/* Replace with actual value */}
                        </tr>
                    </tbody>
                </table>

                <div style={{ marginTop: '200px', textAlign: 'center' }}>
                    Kigali, Rwanda Done on {formattedDate}
                    <p style={{ color: 'black' }}> {new Date().getFullYear()} UMUSAMBI VILLAGE SYSTEM</p>
                </div>
            </PDFExport>
        </div>
    );
};

export default PdfpaymentReport;
