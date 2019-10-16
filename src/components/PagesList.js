import { useRef, useEffect, useState } from 'react'
import useDocument from '../utils/useDocument';
import Page from './Page';
import handleConfirm from '../utils/handleConfirm';
import PagesControls from './PagesControls';

const PagesList = () => {
    
    const pdf = useDocument( 'https://www.maddiesfund.org/assets/documents/Institute/Cat%20Handling%20Handbook.pdf');
    const pagesList = useRef();
    const [ pages, setPages ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(0);
    const [ readed, setReaded ] = useState(false);
    const [ confirmed, setConfirmed ] = useState(false);

    const handleScroll = ( e ) => {
        const { clientHeight, scrollTop, scrollTopMax } = e.target;
        const currentPageUpdate = Math.floor( scrollTop / clientHeight );

        if ( currentPage !== currentPageUpdate ) {
            setCurrentPage( currentPageUpdate );
        }

        if ( scrollTop === scrollTopMax ) {
            setReaded( true );
        }
    }

    useEffect(() => {
        pagesList.current.addEventListener( 'scroll', handleScroll )

        return () => {
            pagesList.current.removeEventListener( 'scroll', handleScroll )
        }
    }, []);

    useEffect(() => {

        if ( ! pdf ) {
            return;
        }

        const pagesPromises = [];
        for( let i = 0; i < pdf._pdfInfo.numPages; i++ ) {
            pagesPromises.push( pdf.getPage( i + 1 ) );
        }
        
        Promise.all( pagesPromises )
            .then( pages => {
                setPages( pages );
            })

    }, [ pdf ])

    return (
        <div>
            <div ref={pagesList} className="pages__list">
                { pages.map( page => <Page key={page.pageIndex} page={page} currentPage={currentPage} shouldRender={true} /> ) }
            </div>
            <PagesControls confirmed={confirmed} setConfirmed={setConfirmed} documentId={'id'} url={'/confirm'} />
        </div>
    );
}

export default PagesList;
