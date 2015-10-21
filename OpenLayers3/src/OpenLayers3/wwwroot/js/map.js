
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


var style1 = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'blue',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
    })
});

var style2 = [new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'blue',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
    })
}), new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'green',
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0, 255, 0, 0.1)'
    })
})];


var osm = {
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            title: 'grid',
            source: vectorSource,
            style: function (feature, resolution) {
                //console.log('style function',arguments);
                return feature.get('enabled') == 1 ? [style2[0]] : [style2[1]];
                //return [style2[0]];
            }
            //style: style2[1]    
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

var toggleEnabled = new ol.interaction.DragBox({
    condition: ol.events.condition.always,
    style: selectionStyle
});
toggleEnabled.setActive(false);
$('#toggleEnabled').prop('checked', false);

toggleEnabled.on('boxend', function (e) {
    //console.log(arguments);

    var extent = e.target.getGeometry().getExtent();
    vectorSource.forEachFeatureIntersectingExtent(extent, function (feature) {
        //console.log(feature);
        feature.set("enabled", !feature.get('enabled'));
    });
});

$('#toggleEnabled').on('change', function () {
    toggleEnabled.setActive($('#toggleEnabled').prop('checked'));
});

var interactions = ol.interaction.defaults().extend([
         select,
         dragBox,
         toggleEnabled
]);

var controls = ol.control.defaults().extend([new ol.control.ScaleLine(),
    new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        // comment the following two lines to have the mouse position
        // be placed within the map.
        //className: 'custom-mouse-position',
        //target: document.getElementById('mouse-position'),
        undefinedHTML: '...'
    })]);

var map = new ol.Map({
    target: 'map',
    layers: osm.layers,
    view: osm.view,
    controls: controls,
    interactions: interactions
});
