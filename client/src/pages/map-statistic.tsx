import { Loading } from '@components/loading/loading';
import { useCompanies } from '@modules/company/query/company.get';
import { Spin } from 'antd';
import { Circle, GoogleApiWrapper, Map } from 'google-maps-react';

interface MapStatisticProps {
  google: any;
  locations: {}[];
}

const MapStatistic: React.FC<MapStatisticProps> = ({ google, locations }) => {
  const { data: companies, isLoading } = useCompanies();
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
          center={locations[0]}
          initialCenter={locations[0]}
          centerAroundCurrentLocation
          zoom={13}
        >
          {companies?.map((item) => (
            <Circle
              key={item.id}
              radius={10000}
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
