"use client";

const DeletePopUp = ({ onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete();
  };
  const closeDelete = () => {
    onClose();
  };

  return (
    <div
      className="modal fade"
      id="DeleteModal"
      tabIndex="-1"
      //disable outside click
      data-bs-keyboard="false"
      data-bs-backdrop="static"
      aria-labelledby="DeleteModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="model-content">
              <div className="delete-icon">
                <i className="bi bi-exclamation-triangle"></i>
              </div>
              <h5 className="content-title fw-500">Are you sure?</h5>
              <p className="content-text mb-4">
                This action cannot be undone. All values associated with this
                field will be lost.
              </p>
            </div>
            <div className="delete-button">
              <button
                type="button"
                className="btn btn-secondary mr-20"
                data-bs-dismiss="modal"
                onClick={closeDelete}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                type="submit"
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
