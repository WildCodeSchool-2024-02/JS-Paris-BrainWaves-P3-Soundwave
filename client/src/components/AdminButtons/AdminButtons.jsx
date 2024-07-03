import { useState } from "react";
import { TiTick, TiTimes } from "react-icons/ti";
import "./admin-buttons.css";
import ModalValidation from "../ModalValidation/ModalValidation";

function AdminButton({ id, type }) {
  const [openValidation, setOpenValidation] = useState(false);
  const [text, setText] = useState(false);

  // handle open Modal
  const handleValidationModal = (bool) => {
    setText(bool);
    setOpenValidation(true);
    document.body.classList.add("active");
  };

  return (
    <div className="evaluate-admin-buttons">
      <TiTick
        role="button"
        onClick={() => handleValidationModal(true)}
      />
      <TiTimes
        role="button"
        onClick={() => handleValidationModal(false)}
      />
      {openValidation && (
        <ModalValidation
          setOpenValidation={setOpenValidation}
          text={text}
          type={type}
          id={id}
        />
      )}
    </div>
  );
}

export default AdminButton;
