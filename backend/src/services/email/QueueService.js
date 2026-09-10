const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const EmailService = require('./EmailService');

class QueueService {
  constructor() {
    this.isProcessing = false;
  }

  /**
   * Add an email to the queue without sending it immediately.
   */
  async enqueue({ to, templateId, userId, data }) {
    // In a full implementation, you might store the `data` payload temporarily.
    // For this boilerplate, we log the intent.
    const event = await prisma.emailEvent.create({
      data: {
        recipientEmail: to,
        userId: userId,
        templateId: templateId,
        provider: 'System',
        status: 'Queued',
      }
    });

    return event.id;
  }

  /**
   * Process pending emails in the queue.
   * This would typically run on a cron job or worker thread.
   */
  async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    try {
      const pendingEvents = await prisma.emailEvent.findMany({
        where: { status: 'Queued' },
        take: 50,
      });

      for (const event of pendingEvents) {
        // Here you would normally fetch the full email payload (subject, html, etc) 
        // associated with the queued event.
        console.log(`Processing queued email ${event.id} for ${event.recipientEmail}`);
        
        // Simulating processing
        await prisma.emailEvent.update({
          where: { id: event.id },
          data: { status: 'Sent', sentAt: new Date(), providerId: 'queue-processed' }
        });
      }
    } catch (error) {
      console.error('Queue processing error:', error);
    } finally {
      this.isProcessing = false;
    }
  }
}

module.exports = new QueueService();
