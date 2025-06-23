import { useLocation } from "react-router-dom";
import { useState } from "react";

function PdfViewer() {
  const location = useLocation();
  const { pdfFile } = location.state || {};
  const [loading, setLoading] = useState(true);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      {loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 10,
          }}
        >
          <div className="spinner-border text-warn" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}

      <iframe
        src={`https://docs.google.com/gview?url=${pdfFile}&embedded=true`}
        width="100%"
        height="100%"
        title="PDF Viewer"
        onLoad={() => setLoading(false)}
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

export default PdfViewer;
