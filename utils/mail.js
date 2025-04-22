// import nodemailer from 'nodemailer';
import { createTransport } from "nodemailer"

export const mailTransporter = createTransport({
  service: 'gmail',
  // port: 587,
  // secure: false,
  auth: {
    user: 'dorcasnquaye28@gmail.com',
    pass: 'dcji lprp cuoh ggej'

  }

});


export const registerUserMailTemplate = `<div>
           <h1>Dear {{username}}</h1>
          <p>A new account has been created for you!</p>
          <h2>Thank you!</h2>
    </div>`