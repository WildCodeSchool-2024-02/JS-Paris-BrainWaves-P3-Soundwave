const formatName = (name) => {
    let newName = "";
    for (let i = 0; i < name.length; i += 1) {
      if (i === 0) newName += name[i].toUpperCase();
      else newName += name[i];
    }
    return newName;
  };

  export default formatName;