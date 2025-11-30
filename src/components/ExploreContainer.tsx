import './ExploreContainer.css';
import QRScanner from './QrScanner';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div className="container">
      <strong>{name}</strong>
      <strong>¡Bienvenido a la aplicación de inventario!</strong>
      
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      {/* <QRScanner /> */}
    </div>
  );
};

export default ExploreContainer;
