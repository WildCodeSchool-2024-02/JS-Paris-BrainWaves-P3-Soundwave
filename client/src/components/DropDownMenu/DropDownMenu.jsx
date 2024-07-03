import { useState, useEffect } from "react";
import Select from "react-select";
import "./dropdownmenu.css"

function DropDownMenu() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/categories`
        ).then((reponse) => reponse.json());

        const styleOptions = response.map((categorie) => ({
          value: categorie.style,
          label: categorie.style,
        }));
        setOptions(styleOptions);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchStyles();
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#181818',
      border: "none",
      borderBottom: '1px solid #dedcff',
      borderRadius: "none",
    })
  }
   

  return (
    <div>
      <Select options={options} isMulti styles={customStyles} placeholder="Style de musique" className="categories-input"/>
    </div>
  );
}

export default DropDownMenu;
