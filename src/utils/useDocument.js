import { useEffect, useState } from 'react';

export default ( url ) => {

    const [ pdfDocument, setPdfDocument ] = useState();

    useEffect(() => {

        pdfjsLib.getDocument( { url } ).promise
            .then(( pdf ) => {
                console.log(pdf)
                setPdfDocument( pdf );
            })
            .catch(console.error)
    }, [ url ]);

    return pdfDocument;
}