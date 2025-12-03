import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/FetchEndpointHooks";
import { IonCol, IonGrid, IonRow } from "@ionic/react";
import QRScanner from "../components/QrScanner";

interface Details {
  cantidad: number;
  id_oc: number;
  numero_oc: string;
  sku: string;
  tienda: string;
}

interface ApiResponseOc {
  data: Details[];
  status: string;
}

const DetailDocument: React.FC = () => {
  const { oc } = useParams<{ oc: string }>();
  const { data, isLoading } = useFetchData<ApiResponseOc>({ endpoint: 'detalle_oc', methods: "POST", body: { "numero_oc": oc }, filtros: null });
  console.log(data);
  return (
    <div className="container">
      <IonGrid style={{ marginTop: 200 }}>
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
              <IonCol>{detail.sku}</IonCol>
              <IonCol>{detail.cantidad}</IonCol>
              <IonCol>{detail.tienda}</IonCol>
              <IonCol>true</IonCol>
            </IonRow>
          ))
        )}
        <div style={{ marginTop: 70}}>
          <strong>Para recepcionar productos de bulto escanear el QR:</strong>
          <div className="container-Qr">
            <QRScanner />
          </div>
        </div>
      </IonGrid>
    </div>
  );
};

export default DetailDocument;