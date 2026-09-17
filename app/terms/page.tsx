import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <LegalContent
      title="Terms of Use"
      updated="[Add date once reviewed]"
      sections={[
        { heading: "Using this website", body: ["This website provides general information and estimation tools relating to UK tax, benefits and immigration matters. It is not a substitute for individual professional advice."] },
        { heading: "No guaranteed outcomes", body: ["Calculator results are estimates based on the information you provide and the rules in force at the time. They do not constitute an official HMRC, DWP or Home Office decision."] },
        { heading: "Engaging our services", body: ["Specific terms apply once you engage us for a paid service — these will be set out separately in a client care letter or engagement terms. [Add link once available]."] },
        { heading: "Limitation of liability", body: ["[To be reviewed and finalised by the firm's legal/compliance team before production use.]"] },
      ]}
    />
  );
}
