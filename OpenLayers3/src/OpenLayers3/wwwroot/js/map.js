
//Kraków                  19°57'E        50°03'N

var mqSat = new ol.layer.Tile({
    source: new ol.source.MapQuest({ layer: 'sat' })
});

var mqView = new ol.View({
    center: [-10997148, 4569099],
    zoom: 4
});

var nasa_bluemarble = new ol.layer.Tile({
    title: 'Global Imagery',
    source: new ol.source.TileWMS({
        url: 'http://demo.opengeo.org/geoserver/wms',
        params: { LAYERS: 'nasa:bluemarble', VERSION: '1.1.1' }
    })
});

var nasaView =  new ol.View({
    projection: 'EPSG:4326',
    center: [19, 50],
    zoom: 4,
    maxResolution: 0.703125
});

var map = new ol.Map({
    target: 'map',
    layers: [
        mqSat
    ],
    view: mqView
});
