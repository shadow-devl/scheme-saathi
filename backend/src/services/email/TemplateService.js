const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class TemplateService {
  /**
   * Compiles a template by replacing variables in the format {{variableName}}
   */
  compile(templateString, data) {
    if (!templateString) return '';
    return templateString.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? data[key] : match;
    });
  }

  /**
   * Fetch a template from the database and compile it with the provided data.
   */
  async renderTemplate(templateName, data) {
    const template = await prisma.emailTemplate.findUnique({
      where: { name: templateName }
    });

    if (!template) {
      throw new Error(`Template '${templateName}' not found.`);
    }

    // Since variables are stored as a JSON string in SQLite, parse them if needed
    // However, our regex replacement doesn't strictly require the list of variables unless we want validation.
    
    const htmlBody = this.compile(template.htmlBody, data);
    const textBody = this.compile(template.textBody, data);
    const subject = this.compile(template.subject, data);

    return {
      templateId: template.id,
      subject,
      htmlBody,
      textBody,
    };
  }
}

module.exports = new TemplateService();
