import formData from "form-data";
import Mailgun from "mailgun.js";

export function createMailgunClient(params: { apiKey: string; baseUrl?: string }) {
  const mailgun = new Mailgun(formData);

  return mailgun.client({
    username: "api",
    key: params.apiKey,
    url: params.baseUrl, // optional (EU endpoint etc.)
  });
}

export type MailgunClient = ReturnType<typeof createMailgunClient>;
