import { use } from 'react';
import './ExploreContainer.css';
import QRScanner from './QrScanner';
import { useFetchData } from '../hooks/FetchEndpointHooks';
import { IonItem, IonLabel, IonList, IonSpinner } from '@ionic/react';

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

  const {data, isLoading} = useFetchData<ApiResponseOc>({
                                                        endpoint: 'listar_oc',
                                                        methods: "POST",
                                                        body: {
                                                          "store_id": "COS"
                                                        },
                                                        filtros: null});
  console.log(data);
  return (
    <div className="container">
      <strong>{name}</strong>
      <strong>¡Bienvenido a la aplicación de inventario!</strong>
      <strong>Seleccione una opción del menú para comenzar.</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      {/* <QRScanner /> */}
      {isLoading && <IonSpinner name="dots" />}

      {/* Lista */}
      {!isLoading && data?.data && (
        <IonList>
          {data.data.map((oc, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{oc.numero_oc}</h2>
              </IonLabel>
            </IonItem>
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
