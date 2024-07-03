import nodemailer from "nodemailer";
import { MAIL, PASSWORD } from "./config.js";
/*Este es el  archivo que maneja la verificacion de correo*/

// Configura las credenciales del correo electronico 
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL,
    pass: PASSWORD,
  },
});

export const sendEmail = async (email, sub, html) =>{
  try {
    await transporter.sendMail({
      from: MAIL, // sender address
      to: email, // list of receivers
      subject: sub, // Subject line
      html, // html body
    });

  } catch (error) {
    console.log('Algo no va bien con el email', error);
  }
}
export const confirmTemplate = (name, token) => {
  return `
    <div id="email___content">
        
        <h2>Hola ${ name }</h2>
        <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
        <a
            href="http://localhost:3000/api/auth/confirm/${ token }"
            target="_blank"
        >Confirmar Cuenta</a>
    </div>
  `;
}
export const forgotTemplate = (name,id, token) => {
  return `
    <div id="email___content">
        
        <h2>Hola ${ name }</h2>
        <p>Para cambiar tu contraseña, ingresa al siguiente enlace</p>
        <a
            href="http://localhost:3000/api/auth/forgot/${id}/${ token }"
            target="_blank"
        >Cambiar contraseña</a>
    </div>
  `;
}