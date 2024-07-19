const tables = require("../../database/tables");

const ValidateUserForm = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  const errors = [];

  if (!firstname || firstname.length >= 255) {
    errors.push({ label: "firstnameRequire", error: "Prénom obligatoire" });
  }

  if (!lastname || lastname.length >= 255) {
    errors.push({ label: "lastnameRequire", error: "Nom obligatoire" });
  }

  if (!email) {
    errors.push({ label: "emailRequire", error: "Email obligatoire" });
  }

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.push({
      label: "emailFormat",
      error: "Saisissez une adresse mail valide",
    });
  }

  const [result] = await tables.user.findByEmail(req.body.email);
  if (result) {
    errors.push({
      label: "emailChecked",
      error: "Email déjà existant",
    });
  }

  if (!password) {
    errors.push({
      label: "passwordRequire",
      error: "Mot de passe obligatoire",
    });
  }

  if (password.length < 4) {
    errors.push({
      label: "passwordFormat",
      error: "Le mot de passe doit contenir au moins 4 caractères",
    });
  }

  if (errors.length !== 0) res.status(400).json(errors);
  else next();
};

module.exports = { ValidateUserForm };
