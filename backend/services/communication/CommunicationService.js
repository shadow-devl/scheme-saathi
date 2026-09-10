const { PrismaClient } = require('@prisma/client');
const EmailProvider = require('./providers/EmailProvider');
const SMSProvider = require('./providers/SMSProvider');
const WhatsAppProvider = require('./providers/WhatsAppProvider');

const prisma = new PrismaClient();

class CommunicationService {
  constructor() {
    this.emailProvider = new EmailProvider();
    this.smsProvider = new SMSProvider();
    this.whatsappProvider = new WhatsAppProvider();
  }

  async sendMessage({ contactProfileId, channel, category, templateId, to, subject, content, isDemo = false }) {
    // Determine provider
    let providerName = '';
    let result = null;

    // In demo mode, we simulate delivery entirely.
    if (isDemo) {
      console.log(`[DEMO MODE] Simulated ${channel} message to ${to}`);
      return this._recordMessage({
        contactProfileId,
        channel,
        category,
        templateId,
        provider: 'DEMO_SIMULATION',
        providerMessageId: `demo-${channel}-${Date.now()}`,
        status: 'DELIVERED',
      });
    }

    switch (channel) {
      case 'EMAIL':
        providerName = 'Nodemailer/SMTP';
        result = await this.emailProvider.send(to, subject, content);
        break;
      case 'SMS':
        providerName = 'SMS_Provider';
        result = await this.smsProvider.send(to, content);
        break;
      case 'WHATSAPP':
        providerName = 'WhatsApp_Provider';
        result = await this.whatsappProvider.send(to, content);
        break;
      default:
        throw new Error('Unsupported communication channel');
    }

    const finalStatus = result.success ? (result.simulated ? 'DELIVERED' : 'SENT') : 'FAILED';
    const failureReason = result.error || null;

    return this._recordMessage({
      contactProfileId,
      channel,
      category,
      templateId,
      provider: providerName,
      providerMessageId: result.providerMessageId || null,
      status: finalStatus,
      failureReason,
    });
  }

  async _recordMessage(data) {
    try {
      const now = new Date();
      return await prisma.message.create({
        data: {
          contactProfileId: data.contactProfileId,
          channel: data.channel,
          category: data.category,
          templateId: data.templateId,
          provider: data.provider,
          providerMessageId: data.providerMessageId,
          status: data.status,
          failureReason: data.failureReason,
          queuedAt: now,
          sentAt: data.status === 'SENT' || data.status === 'DELIVERED' ? now : null,
          deliveredAt: data.status === 'DELIVERED' ? now : null,
          failedAt: data.status === 'FAILED' ? now : null,
        }
      });
    } catch (err) {
      console.error('Failed to record message in database:', err);
    }
  }
}

module.exports = new CommunicationService();
