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

let map;
let pointList;
let featuresList = [];

useGeographic();
generateDots();

function generateDots() {

  var places = [[-110, 45], [-10, 65], [-170, 125], [80, -45]];

  for (let index = 0; index < places.length; index++) {

    var newPoint = new Point(places[index]);
    featuresList.push(new Feature(newPoint))

  }

  createMap();

}

function createMap() {

  map = new Map({
    target: "result-map__map",
    view: new View({
      center: [-110,10],
      zoom: 1
    }),
    layers: [
      new TileLayer({
        source: new Stamen({
          layer: "toner"
        })
      }),
      new VectorLayer({
        source: new VectorSource({
          features: featuresList
        }),
        style: new Style({
          image: new Circle({
            radius: 9,
            fill: new Fill({ color: "red" })
          })
        })
      })
    ]
  });

  map.on("moveend", function () {
    var view = map.getView();
    var center = view.getCenter();
  });

  map.on("click", function (event) {
    // alert(coordinate);
  });

}