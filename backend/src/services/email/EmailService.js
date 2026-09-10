const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const GmailProvider = require('./providers/GmailProvider');
const TransactionalProvider = require('./providers/TransactionalProvider');
const DevelopmentProvider = require('./providers/DevelopmentProvider');

class EmailService {
  constructor() {
    // Initialize providers
    this.providers = {
      gmail: new GmailProvider(),
      transactional: new TransactionalProvider(),
      development: new DevelopmentProvider(),
    };
  }

  /**
   * Determine the appropriate provider based on email type and environment.
   */
  getProvider(type) {
    if (process.env.NODE_ENV === 'development') {
      return this.providers.development;
    }
    
    // For production/staging
    if (type === 'transactional' || type === 'system') {
      return this.providers.transactional;
    }
    
    // Default to Gmail for general support/marketing/user emails
    return this.providers.gmail;
  }

  /**
   * Send an email immediately and log to database.
   */
  async sendEmail({ to, subject, htmlBody, textBody, type = 'general', userId = null, templateId = null }) {
    const provider = this.getProvider(type);
    
    // Create initial tracking record
    const event = await prisma.emailEvent.create({
      data: {
        recipientEmail: to,
        userId: userId,
        templateId: templateId,
        provider: provider.name,
        status: 'Queued',
      }
    });

    try {
      const result = await provider.send(to, subject, htmlBody, textBody);
      
      if (result.success) {
        // Update tracking record on success
        await prisma.emailEvent.update({
          where: { id: event.id },
          data: {
            status: 'Sent',
            sentAt: new Date(),
            providerId: result.messageId,
          }
        });
        return { success: true, eventId: event.id };
      } else {
        // Update tracking record on failure
        await prisma.emailEvent.update({
          where: { id: event.id },
          data: {
            status: 'Failed',
            error: result.error,
          }
        });
        return { success: false, error: result.error, eventId: event.id };
      }
    } catch (error) {
      await prisma.emailEvent.update({
        where: { id: event.id },
        data: {
          status: 'Failed',
          error: error.message,
        }
      });
      return { success: false, error: error.message, eventId: event.id };
    }
  }
}

module.exports = new EmailService();
