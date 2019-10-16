export default ( url, documentId, nonce, confirm, setConfirm ) => {

    setConfirm({
        ...confirm,
        loading: true
    });
    fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify({
                documentId,
                nonce
            })
        }
    )
        .then( res => {
            if ( 200 !== res.status ) {
                throw Error();
            }
            return res.json();
        })
        .then( () => {
            setConfirm({
                ...confirm,
                loading: false,
                result: true
            })
        } )
        .catch( () => {
            setConfirm({
                ...confirm,
                loading: false,
                error: true
            })
        } )
};
