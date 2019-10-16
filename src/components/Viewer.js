import { useEffect, useRef, useState } from 'react';

var DEFAULT_URL = '../../web/compressed.tracemonkey-pldi-09.pdf';
var DEFAULT_SCALE_DELTA = 1.1;
var MIN_SCALE = 0.25;
var MAX_SCALE = 10.0;
var DEFAULT_SCALE_VALUE = 'auto';
var USE_ONLY_CSS_ZOOM = true;
var TEXT_LAYER_MODE = 0; // DISABLE
var MAX_IMAGE_SIZE = 1024 * 1024;
var CMAP_URL = '../../node_modules/pdfjs-dist/cmaps/';
var CMAP_PACKED = true;

const Viewer = () => {

    const container = useRef();
    const pdfViewer = useRef();

    const handleResize = () => {
        pdfViewer.current.currentScaleValue = 'auto';
    }

    useEffect(() => {
        pdfViewer.current = new pdfjsViewer.PDFViewer({
            container: container.current,
            textLayerMode: true,
            useOnlyCssZoom: true
        });

        const loadingTask = pdfjsLib.getDocument({
            url: 'http://www.treehouseanimals.org/site/DocServer/catcareguide.pdf',
            maxImageSize: MAX_IMAGE_SIZE,
            cMapUrl: CMAP_URL,
            cMapPacked: CMAP_PACKED,
        });

        loadingTask.onProgress = function (progressData) {
            // console.log( progressData )
        };

        loadingTask.promise
            .then((pdfDocument) => {

                pdfViewer.current.setDocument(pdfDocument);
            })
            .catch( ( exception ) => {
                
                console.log('error')
                console.log(exception)
            } )

        document.addEventListener('pagesinit', handleResize);

        return () => {
            document.removeEventListener('pagesinit', handleResize);
        }
    }, []);

    const zoomIn = (ticks) => {
        var newScale = pdfViewer.current.currentScale;
        do {
            newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
            newScale = Math.ceil(newScale * 10) / 10;
            newScale = Math.min(MAX_SCALE, newScale);
        } while (--ticks && newScale < MAX_SCALE);
        pdfViewer.current.currentScaleValue = newScale;
        // pdfViewer.current.currentScaleValue = pdfViewer.current.currentScale + 0.1
    };
    
    const zoomOut = (ticks) => {
        pdfViewer.current.currentScaleValue = pdfViewer.current.currentScale - 0.1;
    }

    return (
        <div className="pdfreader">
            <div ref={container} id="viewerContainer" className="pdfreader__container">
                <div id="viewer" className="pdfreader__viewer"></div>
            </div>

            <footer>
                <button onClick={zoomIn} className="toolbarButton zoomOut" title="Zoom Out" id="zoomOut">zoom in</button>
                <button onClick={zoomOut} className="toolbarButton zoomIn" title="Zoom In" id="zoomIn">zoom out</button>
            </footer>
        </div>
    );
}

export default Viewer;
