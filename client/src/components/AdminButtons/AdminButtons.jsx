import { TiTick, TiTimes } from "react-icons/ti";
import PropTypes from "prop-types";
import "./admin-buttons.css";

function AdminButton({setOpenValidation, setText, setValidationId, id}) {

  // handle open Modal
  const handleValidationModal = (bool) => {
    setText(bool);
    setOpenValidation(true);
    document.body.classList.add("active");
    setValidationId(id);
  };

  return (
    <div className="evaluate-admin-buttons">
      <TiTick role="button" onClick={() => handleValidationModal(true)} />
      <TiTimes role="button" onClick={() => handleValidationModal(false)} />
    </div>
  );
}

AdminButton.propTypes = {
  setOpenValidation: PropTypes.func.isRequired,
  setText: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setValidationId: PropTypes.func,
};

export default AdminButton;
