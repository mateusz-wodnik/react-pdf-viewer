import handleConfirm from "../utils/handleConfirm";

const PagesControls = ({ url, documentId, confirmed, setConfirmed }) => {
    
    return (
        <div className="pages__controls">
            <button onClick={() => handleConfirm( url, documentId, window.nonce, confirmed, setConfirmed )}>Confirm</button>
        </div>
    )
}

export default PagesControls;