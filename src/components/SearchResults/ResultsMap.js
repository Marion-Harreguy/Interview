import React, { useEffect } from 'react';
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


const ResultsMap = ({resultList}) => {

  let map;
  let featuresList = [];
  let places = [];

  const createMap = () => {
    console.log("creating map");
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

    map.on("moveend", function () {
      var view = map.getView();
      var center = view.getCenter();
    });

    map.on("click", function (event) {
      var feature = map.getFeaturesAtPixel(event.pixel)[0];
  if (feature) {
    var coordinate = feature.getGeometry().getCoordinates();
    popup.setPosition(coordinate);
    $(element).popover({
      placement: 'top',
      html: true,
      content: formatCoordinate(coordinate)
    });
    $(element).popover('show');
  } else {
    $(element).popover('destroy');
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

  var info = document.getElementById('info');

  const formatCoordinate = (coordinate) => {
    return (coordinate[0].toFixed(2) + coordinate[1].toFixed(2));
  }

  useEffect(()=> { 
    places = resultList.map((interview) => (
      [interview.coordinates.x, interview.coordinates.y]
    ));
    // places = [[-110, 45], [-10, 65], [-170, 125], [80, -45]];
    useGeographic();
    generateDots();
  },[resultList]);

  return (
    <div>
      <div id="map" className="map" style={{height: '90%'}} />
      <div id='info' className='info'></div>
    </div>
  );
};

export default ResultsMap;

