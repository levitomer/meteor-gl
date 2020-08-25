import React from 'react';
import { Redux, initialState, reducer } from './redux/redux';
import toast, { Toaster } from 'react-hot-toast';
import Map from 'react-map-gl';
import { MapView } from '@deck.gl/core/typed';
import { IconLayer } from '@deck.gl/layers/typed';
import DeckGL from '@deck.gl/react/typed';
import Filters from './components/Filter/Filters';
import Tooltip from './components/Tooltip/Tooltip';
import marker from './assets/meteor.png';
import * as actions from './redux/actions';
const MAP_STYLE = 'mapbox://styles/mapbox/satellite-v9';

const MAP_VIEW = new MapView({ repeat: true });

const INITIAL_VIEW_STATE = {
    longitude: 0,
    latitude: 35,
    zoom: 1.5,
    maxZoom: 20,
    pitch: 0,
    bearing: 0,
};

const markerMapping = {
    marker: { x: 0, y: -2, width: 513, height: 515, mask: false },
};

export default function App() {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const [hoverInfo, setHoverInfo]: any = React.useState({});

    const layer = new IconLayer({
        id: 'icon',
        pickable: true,
        sizeUnits: 'meters',
        sizeScale: 15,
        sizeMinPixels: 30,
        data: state.meteors,
        iconAtlas: marker,
        iconMapping: markerMapping,
        getPosition: (meteor) => {
            if (!meteor.geolocation) {
                console.warn('METEOR NOT FOUND', meteor);
            } else {
                return meteor!.geolocation.coordinates;
            }
        },
        getIcon: () => 'marker',
        onHover: (info) => setHoverInfo(info),
    });

    React.useEffect(() => {
        async function fetchMeteors() {
            const response = await fetch(
                'https://data.nasa.gov/resource/y77d-th95.json'
            );
            const meteors = await response.json();
            dispatch({ type: actions.GET_METEORS, payload: meteors });
        }
        toast.promise(fetchMeteors(), {
            loading: 'Loading Meteors...',
            success: <b>Meteors loaded!</b>,
            error: <b>Unable to load meteors.</b>,
        });
    }, []);

    return (
        <>
            <DeckGL
                layers={[layer]}
                views={MAP_VIEW}
                initialViewState={INITIAL_VIEW_STATE}
                controller={{ dragRotate: false }}
            >
                {hoverInfo.object && <Tooltip {...hoverInfo} />}
                <Map
                    reuseMaps
                    mapStyle={MAP_STYLE}
                    mapboxAccessToken={
                        process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN
                    }
                />
            </DeckGL>
            <Redux.Provider
                value={React.useMemo(
                    () => ({ state, dispatch }),
                    [state, dispatch]
                )}
            >
                <Filters />
            </Redux.Provider>
            <Toaster
                toastOptions={{
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                }}
            />
        </>
    );
}
