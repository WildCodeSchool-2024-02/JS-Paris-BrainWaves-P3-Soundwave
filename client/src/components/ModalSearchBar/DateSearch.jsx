import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "./datesearch.css";

function DateSearch() {
  const [value, onChange] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenCalendar = () => {
    setOpenCalendar((prevState) => !prevState);
  };


  return (
    <>
      <button
        type="button"
        onClick={handleOpenCalendar}
        className="btn-calendar"
      >
        Agenda
      </button>
      {openCalendar && (
        <Calendar
          onChange={onChange}
          value={value}
          className="display-calendar"
          view="year"
        //   onClickMonth={handleClick}
        />
      )}
    </>
  );
}

export default DateSearch;

