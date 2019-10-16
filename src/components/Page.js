import { useRef, useEffect, useState, memo } from 'react'
import handleConfirm from '../utils/handleConfirm';

const Page = memo(({ page, currentPage }) => {

    const canvas = useRef();
    const textLayerContainer = useRef();
    const [ viewport, setViewport ] = useState({
        height: 0,
        width: 0,
    });
    const [ rendered, setRendered ] = useState( false );

    useEffect(() => {

        const scale = 1.5;
        const viewport = page.getViewport({ scale });
        const context = canvas.current.getContext('2d');

        setViewport({
            height: viewport.height,
            width: viewport.width
        })

        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };

        const pagesToRender = [ currentPage - 1, currentPage, currentPage + 1 ];        

        if ( ! pagesToRender.includes( page.pageIndex ) ) {

            console.log(`no render ${page.pageIndex}`)
            if ( rendered ) {
                console.log(`un render ${page.pageIndex}`)

                setRendered( false );
                context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                return;
            }
            return;
        }

        if ( rendered ) {
            console.log(`already render ${page.pageIndex}`)
            return;
        }

        console.log(`render ${page.pageIndex}`)
        page.render(renderContext).promise
            .then( () => {
                setRendered( true );
                return page.getTextContent();
            })
            .then( textContent => {

                pdfjsLib.renderTextLayer({
                    textContent,
                    viewport,
                    container: textLayerContainer.current
                });
            } )

    }, [ currentPage ]);
    
    return (
        <div className="page">
            {console.log('page render')}
            <canvas ref={canvas} width={viewport.width} height={viewport.height} />
            <div ref={textLayerContainer} id="text-layer" className="page__text"></div>
        </div>
    )
}, ( prevProps, props ) => {
    const { page, currentPage } = props;
    const pagesToRender = [ currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2 ];
    console.log(! pagesToRender.includes( page.pageIndex ))
    return ! pagesToRender.includes( page.pageIndex );
});

export default Page;
