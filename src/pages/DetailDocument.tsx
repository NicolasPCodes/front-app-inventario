import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/FetchEndpointHooks";
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from "@ionic/react";
import { checkmarkCircle, closeCircle } from "ionicons/icons";
import QRScanner from "../components/QrScanner";
import ModalReception from "./DetailReception";
import { useState } from "react";

interface Details {
  cantidad: number;
  id_oc: number;
  numero_oc: string;
  sku: string;
  tienda: string;
  estado: boolean;
}

interface ApiResponseOc {
  data: Details[];
  status: string;
}

const DetailDocument: React.FC = () => {
  const { oc } = useParams<{ oc: string }>();
  const { data, isLoading } = useFetchData<ApiResponseOc>({ endpoint: 'detalle_oc', methods: "POST", body: { "numero_oc": oc }, filtros: null });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrDetection, setQrDetection] = useState<string>("");

  // Funcon que maneja la deteccion del QR
  const handleQrDetection = (decodedText: string) => {
    setQrDetection(decodedText);
    console.log("QR Detectado en DetailDocument:", decodedText);
    const jsonData = JSON.parse(decodedText);
    if (jsonData?.doc == oc){
      setIsModalOpen(true); // Abre el modal al detectar un QR
    } else {
      alert("El documento escaneado no coincide con la orden de compra actual.");
    }
  };

  // funcion debug
  const handleClickJson = () => {
    const data_debug = {
        "doc": "OC-67892",
        "comment": "Ingreso recepcion",
        "id_user": 1,
        "data":[
            {
                "sku": "SKU12346",
                "cantidad": 100
            }
        ]
    };
    // const data_debug = {
    //   doc: "OC-67890",
    //   comment: "Ingreso recepcion",
    //   id_user: 1,
    //   data:[
    //       {
    //           "sku": "SKU12310",
    //           "cantidad": 10
    //       }
    //   ]
    // };
    const jsonString = JSON.stringify(data_debug);
    setQrDetection(jsonString);
    if (data_debug.doc == oc){
      setIsModalOpen(true); // Abre el modal al detectar un QR
    } else {
      alert("El documento escaneado no coincide con la orden de compra actual.");
    }
  };

  console.log(data);
  return (
    <IonContent scrollY={true}>
      <div className="container">
        <IonGrid style={{ marginTop: 100 }}>
          <strong>Recepcionando documento: <br /> {oc}</strong>
          <IonRow style={{ marginTop: 100 }}>
            <IonCol><strong>SKU</strong></IonCol>
            <IonCol><strong>Cantidad</strong></IonCol>
            <IonCol><strong>Tienda</strong></IonCol>
            <IonCol><strong>Estado</strong></IonCol>
          </IonRow>
          {!isLoading && data?.data && (
            data.data.map((detail, index) => (
              <IonRow key={index}>
                <IonCol style={{ paddingLeft: 10 }}>{detail.sku}</IonCol>
                <IonCol>{detail.cantidad}</IonCol>
                <IonCol>{detail.tienda}</IonCol>
                <IonCol>{detail.estado ? <IonIcon icon={checkmarkCircle} color="success" style={{ fontSize: "24px" }} /> : <IonIcon icon={closeCircle} color="danger" style={{ fontSize: "24px" }} />}</IonCol>
              </IonRow>
            ))
          )}
          <div style={{ marginTop: 70 }}>
            <strong>Para recepcionar productos de bulto escanear el QR:</strong>
            <div className="container-Qr">
              <IonButton onClick={handleClickJson}>Debug JSON</IonButton>
              <QRScanner onDetection={handleQrDetection} />
              {/* Modal para mostrar el resultado del QR */}
              <ModalReception
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={qrDetection}
              />
            </div>
          </div>
        </IonGrid>
      </div>
    </IonContent>
  );
};

export default DetailDocument;