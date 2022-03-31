import { Loading } from '@components/loading/loading';
import { useCompanies } from '@modules/company/query/company.get';
import { Spin } from 'antd';
import { Circle, GoogleApiWrapper, Map } from 'google-maps-react';
import { useState } from 'react';

interface MapStatisticProps {
  google: any;
}

const MapStatistic: React.FC<MapStatisticProps> = ({ google }) => {
  const { data: companies, isLoading } = useCompanies();
  const [zoom, setZoom] = useState(8);
  const [center, setCenter] = useState({
    lat: 10.8033,
    lng: 106.6967,
  });
  return (
    <div
      style={{
        height: '90vh',
        width: '60vw',
      }}
    >
      {!isLoading ? (
        <Map
          google={google}
          style={{
            height: '90%',
            width: '100%',
          }}
          containerStyle={{
            width: '80%',
          }}
          center={center}
          initialCenter={center}
          centerAroundCurrentLocation
          zoom={zoom}
          onZoomChanged={(prop, map) => setZoom(map.zoom)}
        >
          {companies?.map((item) => (
            <Circle
              key={item.id}
              radius={(20 - zoom) * 1400}
              center={{
                lat: item.city.lat,
                lng: item.city.lng,
              }}
              onMouseover={() => console.log('mouseover')}
              onClick={() => console.log('click')}
              onMouseout={() => console.log('mouseout')}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#FF0000'
              fillOpacity={0.2}
            />
          ))}
        </Map>
      ) : (
        <Spin size='large' />
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAdHSrR0FH8HdPHWs6ZqEypjRMZWDEi-4g',
  LoadingContainer: Loading,
})(MapStatistic);
