const nodemailer = require('nodemailer');

class EmailProvider {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT) || 2525,
      auth: {
        user: process.env.SMTP_USER || 'testuser',
        pass: process.env.SMTP_PASS || 'testpass'
      }
    });
  }

  async send(to, subject, htmlContent) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Scheme Saathi" <noreply@schemesaathi.com>',
        to,
        subject,
        html: htmlContent
      });
      return { success: true, providerMessageId: info.messageId || `mock-email-${Date.now()}` };
    } catch (error) {
      console.error('EmailProvider Error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = EmailProvider;
