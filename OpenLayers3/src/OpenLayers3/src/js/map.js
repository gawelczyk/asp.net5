
//Kraków 19°57'E 50°03'N  19.93785, 50.06164, 2219471.678, 6456956.818

var mapQuest = {
    layers: [new ol.layer.Tile({
        source: new ol.source.MapQuest({ layer: 'sat' })
    })],
    view: new ol.View({
        center: [2219471.678, 6456956.818],
        zoom: 4
    })
};

var nasaBluemarble = {
    layers: [new ol.layer.Tile({
        title: 'Global Imagery',
        source: new ol.source.TileWMS({
            url: 'http://demo.opengeo.org/geoserver/wms',
            params: { LAYERS: 'nasa:bluemarble', VERSION: '1.1.1' }
        })
    })],
    view: new ol.View({
        projection: 'EPSG:4326',
        center: [19.93785, 50.06164],
        zoom: 4,
        maxResolution: 0.703125
    })
};

var osm = {
    layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
    })],
    view: new ol.View({
        center: [2219471.678, 6456956.818],
        zoom: 10
    })
};

var controls = ol.control.defaults().extend([new ol.control.ScaleLine()]);

var map = new ol.Map({
    target: 'map',
    layers: osm.layers,
    view: osm.view,
    controls: controls
});
