import React, {useEffect, useRef} from "react";
import {Html5QrcodeScanner, Html5QrcodeSupportedFormats} from "html5-qrcode";
import { IonButton } from "@ionic/react";

interface QRScannerProps {
    onDetection: (decodedText: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onDetection }) => {

    const scannerRef = useRef<any>(null);
    const [isScanning, setIsScanning] = React.useState(false);

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

    const iniciarEscaneo = () => {

        // limpiar contenidos previos del div
        const container = document.getElementById("reader");
        if (container) container.innerHTML = "";

        if (!scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
                "reader",
                config,
                false
            );
        }

        scannerRef.current.render(
            (decodedText: string) => {
                console.log(`QR Code detected: ${decodedText}`);
                onDetection(decodedText);
                detenerEscaneo();
            },
            (errorMessage: any) => console.warn(`QR Code scan error: ${errorMessage}`)
        );

        setIsScanning(true);
    };

    const detenerEscaneo = async () => {
        if (scannerRef.current) {
            await scannerRef.current.clear().catch(console.error);
            // scannerRef.current = null;
        }
        setIsScanning(false);
    };

    useEffect(() => {
        return () => {
            scannerRef.current?.clear().catch(console.error);
        }

    }, []);
    return(
        <div className="ion-padding">
            {/* <h2>QR Code Scanner</h2> */}
            {/* Botones */}
            {!isScanning ? (
                // <button onClick={iniciarEscaneo}>
                // Iniciar escaneo
                // </button>
                <IonButton onClick={iniciarEscaneo}>Iniciar escaneo</IonButton>
            ) : (
                <IonButton onClick={detenerEscaneo}>
                Detener escaneo
                </IonButton>
            )}
            <div id="reader" style={{ width: '250px', height: '250px' }}></div>
        </div>
    );
};

export default QRScanner;