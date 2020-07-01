import { UserI } from '../../interfaces/user';
import { generatelink } from './emailToken';

export const htmlEmailConfirm = (user: UserI, link: string) => {
  const url = generatelink(link, user);
  return `    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        background-color: #ecf0f1;
      }
      .message-container {
        width: 60%;
        font-family: sans-serif;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
      }
      .head__message {
        width: 100%;
        background-color: #2c3e50;
        color: #fff;
        text-align: center;
        padding-bottom: 40px;
      }
      .title__message {
        padding: 20px;
      }
      .body__message {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 30px;
        padding-bottom: 30px;
        color: #7f8c8d;
        font-size: 18px;

      }
      .text__message {
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .btn-confirm {
        background-color: #16a085;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
        border-radius: 25px;
        display: inline-block;
        width: auto;
        padding: 15px 25px;
      }
      .btn__message {
        width: 100%;
        margin-bottom: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-self: center;
      }
      .from__message {
        display: block;
        margin-top: 20px;
        font-weight: 600;
      }
    </style>
    <div class="message-container">
      <div class="head__message">
        <h2 class="title__message">Bienvenido/a ${user.displayName?.trim()}</h2>
        <p class="message__description">Nos Alegra tenerte a bodo</p>
      </div>
      <div class="body__message">
        <p class="text__message">
          Por favor, confirme su cuenta haciendo click en el siguiente botón:
        </p>
        <div class="btn__message">
          <a href="${url}" class="btn-confirm">Confirmar correo electrónico</a>
        </div>
        <p class="text__message">
          Una vez confirmado, usted estará habilitado a ingresar a Renovelweb usando
          su nueva cuenta.
        </p>
        <p class="text__message">
          Los mejores deseos,<span class="from__message">Renovelweb</span>
        </p>
      </div>
    </div>
`;
};

export const htmlEmailSignUp = (user: UserI, link?: string) => {
  return `
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
      }
      body {
        background-color: #ecf0f1;
      }
      .message-container {
        width: 60%;
        font-family: sans-serif;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
      }
      .head__message {
        width: 100%;
        background-color: #2c3e50;
        color: #fff;
        text-align: center;
        padding-bottom: 40px;
      }
      .title__message {
        padding: 20px;
      }
      .body__message {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 30px;
        padding-bottom: 30px;
        color: #7f8c8d;
        font-size: 18px;
      }
      .text__message {
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .btn-confirm {
        background-color: #16a085;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
        border-radius: 25px;
        display: inline-block;
        width: auto;
        padding: 15px 25px;
      }
      .btn__message {
        width: 100%;
        margin-bottom: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-self: center;
      }
      .from__message {
        display: block;
        margin-top: 20px;
        font-weight: 600;
      }

      .link-container {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    </style>
  
      <div class="message-container">
      <div class="head__message">
        <h2 class="title__message">Hola ${user.userName}</h2>
        <p class="message__description">Solicitud para iniciar session</p>
      </div>
      <div class="body__message">
        <p class="text__message">
          Si hiciste esta solicitud, haz clic en el enlace de más abajo. Si no,
          puedes ignorar este mensaje.
        </p>
        <div class="link-container">
          <a href="#" class="link__message"
            >${link}</a
          >
        </div>
        <p class="text__message">
          (¿No funciona el enlace? Copia la dirección y pégala en la barra del
          navegador).
        </p>
        <p class="text__message">
          Esto es un correo automático sobre el uso de
          <a href="#" class="link__message">
            renovelweb.com
          </a>
          renovelweb.com. Para contactar con nosotros, por favor usa
          <a href="#" class="link__message"> renovelweb.com/contact</a>.
          <span class="from__message">ATT: Renovelweb</span>
        </p>
      </div>
    </div>
  `;
};

export const htmlEmailResetPassword = (user: UserI, link?: string) => {
  return `
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      a {
        text-decoration: none;
      }
      body {
        background-color: #ecf0f1;
      }
      .message-container {
        width: 60%;
        font-family: sans-serif;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
      }
      .head__message {
        width: 100%;
        background-color: #2c3e50;
        color: #fff;
        text-align: center;
        padding-bottom: 40px;
      }
      .title__message {
        padding: 20px;
      }
      .body__message {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 30px;
        padding-bottom: 30px;
        color: #7f8c8d;
        font-size: 18px;
      }
      .text__message {
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .btn-confirm {
        background-color: #16a085;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
        border-radius: 25px;
        display: inline-block;
        width: auto;
        padding: 15px 25px;
      }
      .btn__message {
        width: 100%;
        margin-bottom: 40px;
        margin-top: 40px;
        display: flex;
        justify-content: center;
        align-self: center;
      }
      .from__message {
        display: block;
        margin-top: 20px;
        font-weight: 600;
      }

      .link-container {
        margin-top: 10px;
        margin-bottom: 10px;
      }
    </style>
  <div class="message-container">
      <div class="head__message">
        <h2 class="title__message">Hola ${user.userName}</h2>
        <p class="message__description">Solicitud para cambiar contrasenia</p>
      </div>
      <div class="body__message">
        <p class="text__message">
          Si hiciste esta solicitud, haz clic en el enlace de más abajo. Si no,
          puedes ignorar este mensaje.
        </p>
        <div class="link-container">
          <a href="#" class="link__message"> ${link}</a>
        </div>
        <p class="text__message">
          (¿No funciona el enlace? Copia la dirección y pégala en la barra del
          navegador).
        </p>
        <p class="text__message">
          Esto es un correo automático sobre el uso de
          <a href="#" class="link__message">
            renovelweb.com
          </a>
          renovelweb.com. Para contactar con nosotros, por favor usa
          <a href="#" class="link__message"> renovelweb.com/contact</a>.
          <span class="from__message">ATT: Renovelweb</span>
        </p>
      </div>
    </div>
  
  `;
};
