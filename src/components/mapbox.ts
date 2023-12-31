import mapbox from 'mapbox-gl';
import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';

// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;

const key = Symbol();

interface MapContext {
    getMap: () => mapboxgl.Map;
}

export { mapbox, key, type MapContext };