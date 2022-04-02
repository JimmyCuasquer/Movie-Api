const pug = require('pug');
const { htmlToText } = require('html-to-text');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

class Email {
  constructor(emails) {
    this.emails = emails;
    this.from = `jimmi Perez <${process.env.EMAIL}>`;
  }
  newTransport() {
    return nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '460dba6974192b',
        pass: 'a3ba54296d592a'
      }
    });
  }
  async send() {
    const html = pug.renderFile(`${__dirname}/../emails/baseEmail.pug`);

    await this.newTransport().sendMail({
      from: this.from,
      to: this.emails,
      html,
      text: htmlToText(html),
      subject: 'This is a test email'
    });
  }
}

module.exports = { Email };
