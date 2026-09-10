const nodemailer = require('nodemailer');

class TransactionalProvider {
  constructor() {
    this.name = 'Transactional';
    // Use SMTP for Transactional provider (e.g., SendGrid, Postmark)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(to, subject, htmlBody, textBody) {
    if (!process.env.SMTP_HOST) {
      throw new Error('Transactional Provider not configured (Missing SMTP_HOST)');
    }

    const mailOptions = {
      from: `"Scheme Saathi" <${process.env.TRANSACTIONAL_SENDER_EMAIL || process.env.SMTP_USER}>`,
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

module.exports = TransactionalProvider;
