const nodemailer = require('nodemailer');

class GmailProvider {
  constructor() {
    this.name = 'Gmail';
    // Use OAuth2 as per the specification
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_SENDER_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  async send(to, subject, htmlBody, textBody) {
    if (!process.env.GMAIL_SENDER_EMAIL) {
      throw new Error('Gmail Provider not configured (Missing GMAIL_SENDER_EMAIL)');
    }

    const mailOptions = {
      from: `"Scheme Saathi" <${process.env.GMAIL_SENDER_EMAIL}>`,
      to,
      subject,
      html: htmlBody,
      text: textBody,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = GmailProvider;
