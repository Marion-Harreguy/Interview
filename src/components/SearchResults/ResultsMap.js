import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "ol/ol.css";
import { useGeographic } from "ol/proj";
import View from "ol/View";
import { Feature, Overlay } from "ol/index";
import Map from "ol/Map";
import { Point } from "ol/geom";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
// import CanvasVectorTileLayerRenderer from 'ol/renderer/canvas/VectorTileLayer';
import { Stamen, Vector as VectorSource } from "ol/source";
import { Style, Circle, Fill } from "ol/style";
import ResultSelected from './ResultSelected';


const ResultsMap = ({ resultList }) => {

  const [chosenInterview, setChosenInterview] = useState({});
  let map;
  const featuresList = [];
  let places = [];

  const createMap = () => {
    map = new Map({
      target: 'map',
      view: new View({
        center: [-110, 10],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner',
          }),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: featuresList,
          }),
          style: new Style({
            image: new Circle({
              radius: 9,
              fill: new Fill({ color: "red" }),
            }),
          }),
        }),
      ],
    });

    map.on('moveend', () => {
      const view = map.getView();
      const center = view.getCenter();
    });

    map.on('click', (event) => {
      const feature = map.getFeaturesAtPixel(event.pixel)[0];
      if (feature) {
        setChosenInterview({...resultList.find((interview) => interview.coordinates[0] === feature.getGeometry().getCoordinates()[0] && interview.coordinates[1] === feature.getGeometry().getCoordinates()[1])});
      }
    });

  }

  const generateDots = () => {
    for (let index = 0; index < places.length; index++ ) {
      const newPoint = new Point(places[index]);
      featuresList.push(new Feature(newPoint));
    }
    createMap();
  };

  useEffect(() => {
    places = resultList.map((interview) => (
      [interview.coordinates[0], interview.coordinates[1]]
    ));
    useGeographic();
    generateDots();
  }, [resultList]);

  return (
    <div style={{ height: '100%' }}>
      <div id="map" className="map" style={{ height: '70%' }} />
      {
            chosenInterview.hasOwnProperty('id') && (
              <ResultSelected interview={chosenInterview} />
            )
        }
    </div>
  );
};

ResultsMap.propTypes = {
  resultList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired),
      date: PropTypes.string.isRequired,
      openLicence: PropTypes.bool.isRequired,
      author: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        structure: {
          name: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          sector: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        },
      }).isRequired,
      interviewed: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        structure: {
          name: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          sector: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
        },
      }).isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      context: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ResultsMap;
