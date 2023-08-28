import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "../styles/mapbox-simple.css";

export function MapboxSimple({ group = [], isLoading, onGroup, onMarker }) {
  if (isLoading) {
    return <div className="PlaceSearchResultsMapLoading"></div>;
  }

  return (
    <div className="PlaceSearchResultsMap">
      <MapContainer
        center={[-9.52264, -76.96734]}
        zoom={4.5}
        style={{ height: "100%", width: "auto" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {group?.map((group, i) => {
          return (
            <MarkerClusterGroup
              spiderfyOnMaxZoom={false}
              zoomToBoundsOnClick={false}
              onClick={() => onGroup(group)}
              key={`marker-cluster-${i}`}
            >
              {group?.items?.map((item, j) => (
                <Marker
                  key={`marker-${i}-${j}`}
                  position={item}
                  eventHandlers={{
                    click: () => onMarker(item),
                  }}
                />
              ))}
            </MarkerClusterGroup>
          );
        })}
      </MapContainer>
    </div>
  );
}
