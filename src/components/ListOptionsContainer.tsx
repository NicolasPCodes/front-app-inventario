import { use } from 'react';
import './ExploreContainer.css';
import QRScanner from './QrScanner';
import { useFetchData } from '../hooks/FetchEndpointHooks';
import { IonButton, IonCard, IonCardContent, IonCardTitle, IonCol, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSpinner } from '@ionic/react';

interface ContainerProps {
  name: string;
}

interface Oc {
  numero_oc: string;
}

interface ApiResponseOc {
  data: Oc[];
  status: string;
}

const ListOptionsContainer: React.FC<ContainerProps> = ({ name }) => {

  const {data, isLoading} = useFetchData<ApiResponseOc>({ endpoint: 'listar_oc', methods: "POST", body: { "store_id": "COS"},filtros: null});
  console.log(data);
  return (
    <div className="container">
      <strong>{name}</strong>
      {/* <strong>¡Bienvenido a la aplicación de inventario!</strong> */}
      <br />
      <strong>Seleccione una documento para comenzar recepcion.</strong>
      <br />
      {/* <QRScanner /> */}
      {isLoading && <IonSpinner name="dots" />}

      {/* Lista */}
      {!isLoading && data?.data && (
        <IonList>
          {data.data.map((oc, index) => (
              <IonButton
                expand="block"
                key={index}
                style={{ minWidth: '350px', maxWidth: '500px' }}
                onClick={() => window.location.href=`/detail-oc/${oc.numero_oc}`}>{oc.numero_oc}</IonButton>
            // </IonItem>
          ))}
        </IonList>
      )}

      {/* Si no hay resultado */}
      {!isLoading && (!data || data.data.length === 0) && (
        <p>No se encontraron órdenes de compra.</p>
      )}
    </div>
  );
};

export default ListOptionsContainer;
