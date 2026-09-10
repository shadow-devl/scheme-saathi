class DevelopmentProvider {
  constructor() {
    this.name = 'Development';
  }

  async send(to, subject, htmlBody, textBody) {
    // Just log to console for development
    console.log(`
      [DEV EMAIL SIMULATION]
      To: ${to}
      Subject: ${subject}
      Body length: ${htmlBody ? htmlBody.length : 0} bytes HTML, ${textBody ? textBody.length : 0} bytes Text
    `);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      success: true,
      messageId: `dev-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    };
  }
}

module.exports = DevelopmentProvider;
