
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

var mapbox = new ol.layer.Tile({
    source: new ol.source.TileJSON({
        url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
    })
});

var vectorSource = new ol.source.Vector({
    url: '/data/grid.json',
    format: new ol.format.GeoJSON()
});

var osm = {
    layers: [new ol.layer.Tile({
        source: new ol.source.OSM()
    }),
    new ol.layer.Vector({
        title: 'grid',
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        })
    })],
    view: new ol.View({
        center: [2219471.678, 6456956.818],
        zoom: 13
    })
};

var selectionStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255, 0, 0, 0.3)'
    }),
    stroke: new ol.style.Stroke({
        color: '#000000'
    })
});

var dragBox = new ol.interaction.DragBox({
    condition: ol.events.condition.platformModifierKeyOnly,
    style: selectionStyle
});

dragBox.on('boxend', function (e) {
    // features that intersect the box are added to the collection of
    // selected features
    var extent = dragBox.getGeometry().getExtent();
    vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
        selectedFeatures.push(feature);
    });
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', function (e) {
    selectedFeatures.clear();
});


var select = new ol.interaction.Select({
    style: selectionStyle
});
var selectedFeatures = select.getFeatures();

var interactions = ol.interaction.defaults().extend([
         select,
         dragBox
]);

var controls = ol.control.defaults().extend([new ol.control.ScaleLine()]);

var map = new ol.Map({
    target: 'map',
    layers: osm.layers,
    view: osm.view,
    controls: controls,
    interactions: interactions
});
