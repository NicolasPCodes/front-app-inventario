import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import React, { use, useEffect } from "react";
import { useFetchData } from "../hooks/FetchEndpointHooks";


interface MyModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: string;
}

interface ApiResponseOc {
  status: string;
  message: string;
}


const ModalReception: React.FC<MyModalProps> = ({ isOpen, onClose, data }) => {

  const modal = React.useRef<HTMLIonModalElement>(null);
  const input = React.useRef<HTMLIonInputElement>(null);

  const { fetchdata, data: dataRecepcion, isLoading: loadingRecepcion } = useFetchData<ApiResponseOc>({ endpoint: 'actualizar_recepcion', methods: "POST", body: data, filtros: null, autoFetch: false });

  useEffect(() => {
    if (dataRecepcion) {
      console.log("Respuesta de la recepción:", dataRecepcion);

      if (dataRecepcion.status === "success") {
        alert("Recepción confirmada correctamente.");
        onClose();
      } else {
        alert(`Error en la recepción: ${dataRecepcion.message}`);
      }
    }
  }, [dataRecepcion]);

  async function confirmRecepcion() {
    await fetchdata();    // 👈 AQUÍ SÍ SE PERMITE
  }

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={onClose}>Cerrar</IonButton>
          </IonButtons>
          <IonTitle>QR Detectado</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Productos a recepcionar:</h2>
        <p>{data}</p>
        <IonButton onClick={confirmRecepcion}>Confirmar</IonButton>
      </IonContent>
    </IonModal>
  );
};

export default ModalReception;