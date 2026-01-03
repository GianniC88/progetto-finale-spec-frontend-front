import ReactDOM from "react-dom";

export default function Modal({ title, content, show, onClose }) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className="custom-modal" onClick={onClose}>
      <div className="custom-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn btn-danger custom-modal-close-btn"
          onClick={onClose}
        >
          Chiudi
        </button>
        <h3 className="mb-4">
          <strong>{title}</strong>
        </h3>
        {content}
      </div>
    </div>,
    document.body
  );
}
