import React, {useEffect} from "react";
import {Html5QrcodeScanner, Html5QrcodeSupportedFormats} from "html5-qrcode";

const QRScanner: React.FC = () => {
    
    useEffect(() => {
        const config = {
            fps: 10,
            qrbox: 250,
            formatsToSupport: [
                Html5QrcodeSupportedFormats.QR_CODE,
                Html5QrcodeSupportedFormats.CODE_128,
                Html5QrcodeSupportedFormats.CODE_39,
                Html5QrcodeSupportedFormats.EAN_13
            ]
        };
        const scanner = new Html5QrcodeScanner("reader", config, false);

        scanner.render(
            (decodedTest) => {
                console.log(`QR Code detected: ${decodedTest}`);
                alert(`QR Code detected: ${decodedTest}`);
            },
            (errorMessage) => {
                console.warn(`QR Code scan error: ${errorMessage}`);
            }
        );

        return () => {
            scanner.clear().catch(console.error);
        };
    }, []);
    return(
        <div className="ion-padding">
            <h2>QR Code Scanner</h2>
            <div id="reader" style={{ width: '250px', height: '250px' }}></div>
        </div>
    );
};

export default QRScanner;