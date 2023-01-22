import type {Feature, FeatureCollection} from 'geojson';
import React, {useEffect, useMemo} from 'react';
import * as ml from 'maplibre-gl';

// css
import styles from './map.module.css'

import {notEmpty} from '../../../../utils/helpers';
import {ambassadorData, enclosureData, facilityData, mapData} from "../../../../utils/data";
import {OverlayView, SelectionAction, SelectionState} from '../overlay/Overlay';


type MapProps = {
    setView: (view: OverlayView) => void;
  dispatchSelection: (action: SelectionAction) => void;
  selectionState: SelectionState;
};

type MapArgs = {
  mapData: FeatureCollection;
  onClick: (feature: Feature) => void;
};

function getAmbassadorIds(name: string) {
  return name.split('_').filter(notEmpty);
}

export const Map: React.FC<MapProps> = ({
    setView,
    selectionState,
    dispatchSelection,
}) => {
  const mapArgs = useMemo(() => {
    const knownAmbassadors = ambassadorData.map(({id}) => id).filter(notEmpty);
    const knownFacilities = Object.keys(facilityData).filter(notEmpty);
    const knownEnclosures = Object.keys(enclosureData).filter(notEmpty);
    if (mapData) {
      mapData.features = mapData.features.map((feature: any) => {
        if (!feature.properties) {
          return feature;
        }

        const { type, name } = feature.properties;
        if (type === 'ambassador') {
          const ids = getAmbassadorIds(name);
          const labels: Array<string | undefined> = [];
          ids.forEach((ambassadorId) => {
            if (knownAmbassadors.includes(ambassadorId)) {
              labels.push(ambassadorData.find(a => a.id === ambassadorId)?.name);
            }
          });
          feature.properties.ids = ids;
          feature.properties.label = labels.filter(notEmpty).join(', ');
        } else if (type === 'facility' && knownFacilities.includes(name)) {
          feature.properties.label = facilityData[name]?.label;
        } else if (type === 'enclosure' && knownEnclosures.includes(name)) {
          feature.properties.label = enclosureData[name]?.label;
        }

        return feature;
      });

      return {
        mapData: mapData,
        onClick: (feature: Feature) => {
          const props = feature.properties;
          if (!props) {
            return;
          }

          console.log('Clicked on feature', feature);
          if (
            props.name &&
            props.type &&
            ['ambassador', 'facility', 'enclosure'].includes(props.type)
          ) {
              setView('ambassadors'); // TODO: View for enclosures/facilities?

            if (
              props.type === 'ambassador' &&
              getAmbassadorIds(props.name).length > 1
            ) {
              dispatchSelection({
                type: 'select',
                payload: {
                  type: 'ambassadors',
                  ids: getAmbassadorIds(props.name),
                },
              });
            } else {
              dispatchSelection({
                type: 'select',
                payload: {
                  type: props.type,
                  id: props.name,
                },
              });
            }
          }
        },
      };
    }

    return null;
  }, [dispatchSelection]);

  useEffect(() => {
    if (mapArgs) {
      return setupMap(mapArgs);
    }
  }, [mapArgs]);

  return (
    <div id="map" className={styles.map} />
  );
};

function setupMapLayers(map: ml.Map, mapData: FeatureCollection) {
    map.addSource('alveus-data', {
        type: 'geojson',
        data: mapData,
    });

    map.addSource('bg', {
        type: 'geojson',
        data: {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [-38.84543630643094, 28.573117756363345],
                        [-38.79612852923913, 28.573117756363345],
                        [-38.79612852923913, 28.540759112788635],
                        [-38.84543630643094, 28.540759112788635],
                        [-38.84543630643094, 28.573117756363345],
                    ],
                ],
            },
        },
    });

    map.addLayer({
        id: 'bg',
        type: 'background',
        source: 'bg',
        paint: {
            'background-color': '#383d38',
        },
    });

    map.addLayer({
        id: 'perimeter-bg',
        type: 'fill',
        source: 'alveus-data',
        paint: {
            'fill-color': '#6c8439',
            'fill-opacity': 1,
        },
        filter: ['==', 'id', 'perimeter'],
    });

    map.addLayer({
        id: 'perimeter',
        type: 'line',
        source: 'alveus-data',
        paint: {
            'line-color': '#aca89c',
            'line-width': 5,
        },
        filter: ['==', 'id', 'perimeter'],
    });
    map.addLayer({
        id: 'trees',
        type: 'fill',
        source: 'alveus-data',
        paint: {
            'fill-opacity': 0.2,
            'fill-pattern': 'pattern-trees',
        },
        filter: ['==', 'id', 'perimeter'],
    });

    map.addLayer({
        id: 'background',
        type: 'fill',
        source: 'alveus-data',
        paint: {
            'fill-color': '#e0ded5',
            'fill-opacity': 0.4,
        },
        filter: ['==', 'type', 'background'],
    });

    map.addLayer({
        id: 'pasture-bg',
        type: 'fill',
        source: 'alveus-data',
        paint: {
            'fill-color': '#e0d7b8',
            'fill-opacity': 1,
        },
        filter: ['==', 'id', 'pasture-bg'],
    });

    map.addLayer({
        id: 'pasture',
        type: 'fill',
        source: 'alveus-data',
        paint: {
            'fill-opacity': 0.3,
            'fill-pattern': 'pattern-pasture',
        },
        filter: ['==', 'id', 'pasture-bg'],
    });

    map.addLayer({
        id: 'pasture-perimeter',
        type: 'line',
        source: 'alveus-data',
        paint: {
            'line-color': '#e0d7b8',
            'line-width': 2,
        },
        filter: ['==', 'id', 'pasture-bg'],
    });

    map.loadImage('/map-assets/texture-trees.jpg', function (err, image) {
        if (image) map.addImage('pattern-trees', image);
    });
    map.loadImage('/map-assets/texture-pasture.jpg', function (err, image) {
        if (image) map.addImage('pattern-pasture', image);
    });

    map.addLayer({
        id: 'paths',
        type: 'line',
        source: 'alveus-data',
        paint: {
            'line-color': '#aca89c',
            'line-width': 8,
            'line-opacity': 0.4,
        },
        filter: ['==', 'type', 'path'],
    });

    map.addLayer({
        id: 'dividing-fence',
        type: 'line',
        source: 'alveus-data',
        paint: {
            'line-color': '#aca89c',
            'line-width': 4,
            'line-opacity': 0.3,
        },
        filter: ['==', 'id', 'dividing-fence'],
    });
}

function setupMap({ mapData, onClick }: MapArgs) {
  const map = new ml.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {},
      layers: [],
    },
    maxBounds: [-38.825709, 28.554972, -38.817921, 28.559234],
    bounds: [-38.824277, 28.556153, -38.819544, 28.557389],
    maxZoom: 20,
    minZoom: 15.51,
    pitch: 45,
  });

  const containerEl = map.getContainer();
  containerEl.className += ' ' + styles.map;

  let prevZoom = Math.round(map.getZoom());
  map.on('zoom', function () {
    const newZoom = Math.round(map.getZoom());
    if (newZoom !== prevZoom) {
      prevZoom = newZoom;
      containerEl.setAttribute('data-zoom', String(newZoom));
    }
  });

  map.on('load', function () {
      setupMapLayers(map, mapData);

      //// create the popup
    //const popup = new ml.Popup({ offset: 25 }).setText(
    //  'Construction on the Washington Monument began in 1848.'
    //);
    //
    //// create DOM element for the marker
    //const el = document.createElement('div');
    //el.id = 'marker';
    //
    //// create the marker
    //new ml.Marker(el)
    //  .setLngLat(monument)
    //  .setPopup(popup) // sets a popup on this marker
    //  .addTo(map);
  });

  mapData.features.forEach(function (marker: Feature) {
    const props = marker.properties || {};
    const type = props.type;

    if (marker.geometry.type === 'Point') {
      const markerEl = document.createElement('div');
      markerEl.className = styles.marker;

      markerEl.addEventListener('click', () => {
        onClick(marker);
      });

      const labelEl = document.createElement('div');
      labelEl.className = styles.label;
      labelEl.textContent = marker.properties?.label || '';

      const iconEl = document.createElement('div');
      iconEl.className = styles.icon;

      if (type === 'ambassador' && props.size !== 'small') {
        iconEl.className += ' w-12 h-12';
        labelEl.className += ' mt-6';
      } else if (type === 'ambassador') {
        iconEl.className += ' w-6 h-6';
        labelEl.className += ' mt-4';
      } else {
        iconEl.style.backgroundImage = `url(/map-assets/icons/location.png)`;
      }

      if (type === 'ambassador' || type === 'nonAmbassador') {
        iconEl.style.backgroundImage = `url(/map-assets/icons/${marker.properties?.name}.png)`;
      }

      markerEl.append(iconEl);
      markerEl.append(labelEl);

      new ml.Marker(markerEl)
        .setLngLat(marker.geometry.coordinates as [number, number])
        .addTo(map);
    }
  });

  return () => {
    map.remove();
  };
}
