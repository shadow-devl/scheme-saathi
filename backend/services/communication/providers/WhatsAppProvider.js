class WhatsAppProvider {
  constructor() {
    this.apiKey = process.env.WHATSAPP_API_KEY;
    this.apiSecret = process.env.WHATSAPP_API_SECRET;
    this.senderId = process.env.WHATSAPP_SENDER_ID || 'SCHEME_SAATHI_WA';
    this.isConfigured = !!(this.apiKey && this.apiSecret);
  }

  async send(to, textContent) {
    if (!this.isConfigured) {
      console.log(`[WhatsApp Simulation] To: ${to}, Message: ${textContent}`);
      return { 
        success: true, 
        providerMessageId: `sim-wa-${Date.now()}`,
        simulated: true 
      };
    }

    try {
      // TODO: Replace with real WhatsApp Business API / Twilio client integration
      
      const mockProviderMessageId = `wa-${Date.now()}`;
      return { success: true, providerMessageId: mockProviderMessageId };
    } catch (error) {
      console.error('WhatsAppProvider Error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = WhatsAppProvider;
