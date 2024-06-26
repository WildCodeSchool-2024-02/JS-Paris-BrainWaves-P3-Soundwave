const ValidateForm = (req, res, next) => {
  const {
    name,
    date,
    starting_hour: startingHour,
    address,
    description,
    image,
    lineup,
  } = req.body;

  const errors = [];

  if (!name || name.length >= 255) {
    errors.push({ label: "nameRequire", error: "Nom obligatoire" });
  }

  if (!date || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(date)) {
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

  if (errors.length !== 0) {
    return res.status(400).json(errors);
  }

  return next();
};

module.exports = { ValidateForm };
