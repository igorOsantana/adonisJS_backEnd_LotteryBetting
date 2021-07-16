"use strict";

const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Kue = use("Kue");
const Job = use("App/Jobs/ResetPasswordMail");

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      const { username, token } = user;

      const link = `${request.input("redirect_url")}?token=${token}`;

      await user.save();

      Kue.dispatch(Job.key, { email, username, link }, { attempts: 3 });
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Erro ao recuperar senha. Verifique o email inserido.",
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token, password } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract(2, "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message:
              "O token de recuperação está expirado, faça uma nova requisição de recuperação de senha para obter um novo token.",
          },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.password = password;

      await user.save();
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: "Erro ao recuperar senha. Tente novamente mais tarde.",
        },
      });
    }
  }
}

module.exports = ForgotPasswordController;
