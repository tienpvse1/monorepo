import { Loading } from '@components/loading/loading';
import { Circle, GoogleApiWrapper, Map } from 'google-maps-react';

interface MapStatisticProps {
  google: any;
  locations: {}[];
}

const MapStatistic: React.FC<MapStatisticProps> = ({ google, locations }) => {
  return (
    <div
      style={{
        height: '90vh',
        width: '60vw',
      }}
    >
      <Map
        google={google}
        style={{
          height: '90%',
          width: '100%',
        }}
        containerStyle={{
          width: '80%',
        }}
        center={locations[0]}
        initialCenter={locations[0]}
        centerAroundCurrentLocation
        zoom={13}
      >
        <Circle
          radius={1200}
          center={locations[0]}
          onMouseover={() => console.log('mouseover')}
          onClick={() => console.log('click')}
          onMouseout={() => console.log('mouseout')}
          strokeColor='transparent'
          strokeOpacity={0}
          strokeWeight={5}
          fillColor='#FF0000'
          fillOpacity={0.2}
        />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCDrvO8bRp1-YqqQRzlDnCkAjEzJI9utlQ',
  LoadingContainer: Loading,
})(MapStatistic);
