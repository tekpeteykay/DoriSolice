import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalContent
      title="Privacy Policy"
      updated="[Add date once reviewed]"
      sections={[
        {
          heading: "Who we are",
          body: ["Dori Solic (\"we\", \"us\") provides UK legal, tax and immigration information and professional services. [Add full company/registration details]."],
        },
        {
          heading: "What we collect",
          body: [
            "We collect information you provide directly — for example, through the contact form, appointment booking, or an intake questionnaire. This may include your name, contact details, and a brief description of your matter.",
            "We do not ask for more sensitive personal data than is necessary for the purpose you're using the site for, and calculator inputs are processed in your browser rather than being stored against your identity unless you submit them as part of a booking or enquiry.",
          ],
        },
        {
          heading: "How we use it",
          body: ["To respond to enquiries, manage appointments, and — only with separate marketing consent — to send occasional updates about UK legal, tax and immigration matters."],
        },
        {
          heading: "Data retention",
          body: ["We keep personal data only for as long as necessary for the purpose it was collected, and in line with our professional and regulatory obligations. [Add specific retention periods once confirmed]."],
        },
        {
          heading: "Your rights",
          body: ["Under UK GDPR, you have rights to access, correct, or request deletion of your personal data, among others. [Add contact details for exercising these rights]."],
        },
        {
          heading: "Contact",
          body: ["[Add data protection contact details]."],
        },
      ]}
    />
  );
}
