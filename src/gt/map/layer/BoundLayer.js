import Layer from "sap/a/map/layer/Layer";

import OsmServiceClient from "../../service/OsmServiceClient";

export default class BoundLayer extends Layer {
    metadata = {
        properties: {
            geoJson: { type: "object", bindable: true },
            cityBounds: { type: "object", bindable: true }  //array of array
        },
    };
    
    _drawBounds() {
        const bounds = this.getCityBounds();
        this.rectangle = L.rectangle(bounds, {
            color: "rgb(0, 51, 255)",
            opacity: 0.8,
            weight: 2
        });
        
        this.rectangle.editing.enable();
		this.rectangle.on("edit", e => {
            const [bottomLeft, topLeft, topRight, bottomRight] = e.target.getLatLngs();
            this.setCityBounds([bottomLeft, topRight], false);
		});
        
        this.container.addLayer(this.rectangle);
        this.fitBounds();
    }
    
    setCityBounds(value, clearLayers = true)
    {
        this.setProperty("cityBounds", value);
        if (value && clearLayers)
        {
            this.container.clearLayers();
            this._drawBounds();
        }
    }
    
    setGeoJson(geoJson)
    {
        const layer = L.geoJson(geoJson, {
            color: "#ff0000"
        });
        this.container.addLayer(layer);
        this.fitBounds();
    }
}
