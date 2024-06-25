const ValidateForm = (req, res, next) => {
  const { name, date, starting_hour: startingHour, address, description, image, lineup } =
    req.body;

  const errors = [];

  if (!name || name.length >= 255) {
    errors.push({ label: "nameRequire", error: "Nom obligatoire" });
  } 

  const currentDate = Date();


  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || currentDate > date) {
    errors.push({
      label: "dateRequire",
      error: "Utiliser format YYYY-MM-DD",
    });
  }

  if (!startingHour) {
    errors.push({ label: "hourRequire", error: "Heure de début obligatoire " });
  }

  if (!/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(startingHour)) {
    errors.push({
      label: "hourFormat",
      error: "utliser bon format xx:xx:xx",
    });
  }

  if (!address) {
    errors.push({ label: "addressRequire", error: "Adresse obligatoire" });
  }

  if (!description) {
    errors.push({
      label: "descriptionRequire",
      error: "Description obligatoire",
    });
  }

  if (!image) {
    errors.push({ label: "imageRequire", error: "Image obligatoire" });
  }

  if (!lineup) {
    errors.push({ label: "lineupRequire", error: "Programmation obligatoire" });
  }

  // if (errors !== 0) {
  //   return res.status(400).json(errors);
  // }

  return next();
};

module.exports = { ValidateForm };
