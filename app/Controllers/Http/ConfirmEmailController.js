"use strict";

const moment = require("moment");
const crypto = require("crypto");
const Env = use("Env");
const User = use("App/Models/User");
const Mail = use("Mail");

class ConfirmEmailController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findBy("email", email);

      if (user.confirmed == 1) {
        return response.status(401).send({
          error: {
            message: "Este usuário já foi confirmado.",
          },
        });
      }

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      console.log(user.token, email);

      await user.save();

      await Mail.send(
        ["emails.confirm_email", "emails.confirm_email-text"],
        {
          email,
          link: `${request.input("redirect_url")}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from(Env.get("MAIL_SENDER"), "Visar Emplaca")
            .subject("Confirme o seu email");
        }
      );
    } catch (err) {
      console.log(err);

      return response.status(404).send({
        error: {
          message: "Algo não deu certo! Verifique se esse email é válido.",
          full: err,
        },
      });
    }
  }

  async update({ request, response }) {
    try {
      const { token } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response.status(401).send({
          error: { message: "O token de recuperação está expirado." },
        });
      }

      user.token = null;
      user.token_created_at = null;
      user.confirmed = 1;

      await user.save();
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message:
            "Algo deu errado ao confirmar seu email. O token pode ter expirado. Tente reenviar a confirmação.",
        },
      });
    }
  }
}

module.exports = ConfirmEmailController;
