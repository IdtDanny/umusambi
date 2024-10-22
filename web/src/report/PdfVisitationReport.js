import React, { useRef, useEffect } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf';


const PdfVisitationReport = ({ info, setShow }) => {
    const pdfExportComponent = useRef(null);

    const handleExportPDF = () => {
        pdfExportComponent.current.save();
    };

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date().toLocaleDateString('en-US', options);

    const formatDate=(date)=>{
        return new Date(date).toLocaleDateString('en-US', options)
    }
    useEffect(() => {
        handleExportPDF();
        setShow();
    }, []);

    return (
        <div>
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
                    <h2>visitation report</h2>
                    <hr />
                    <h3>Report on {formattedDate}</h3>
                </div>
                <h3>Visitors list</h3>
                <div style={{ margin: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>First name</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Last name</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>nID</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Phone number</th>
                                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Visitation date</th>

                            </tr>
                        </thead>
                        <tbody>
                            {info.visitors.map((data, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.firstname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.lastname}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.nID}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{data.phone}</td>
                                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>{formatDate(data.visitors.createdAt)}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ marginTop: '200px', textAlign: 'center' }}>
                    Kigali, Rwanda Done on {formattedDate}
                    <p style={{ color: 'black' }}> {new Date().getFullYear()} UMUSAMBI VILLAGE SYSTEM</p>
                </div>
            </PDFExport>
        </div>
    );
};

export default PdfVisitationReport;
