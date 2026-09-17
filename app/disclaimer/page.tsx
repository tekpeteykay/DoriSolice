import type { Metadata } from "next";
import { LegalContent } from "@/components/legal/LegalContent";

export const metadata: Metadata = { title: "Disclaimer" };

export default function DisclaimerPage() {
  return (
    <LegalContent
      title="Disclaimer"
      updated="[Add date once reviewed]"
      sections={[
        {
          heading: "General information, not advice",
          body: [
            "Information provided by Dori Solic — including guides, FAQs and calculator results — is for general information and does not necessarily constitute legal, tax or financial advice. Individual circumstances may produce different outcomes.",
          ],
        },
        {
          heading: "Calculators",
          body: [
            "This calculator provides an estimate based on the information you enter and the rules selected. It is not an official HMRC, DWP or Home Office decision and should not be treated as legal or financial advice.",
          ],
        },
        { heading: "Rules can change", body: ["UK tax, benefit and immigration rules change frequently, sometimes with little notice. Each guide and calculator shows when it was last reviewed — always confirm the current position before relying on it for an important decision."] },
        { heading: "Regulatory information", body: ["[Add SRA or other relevant regulatory information here.]"] },
      ]}
    />
  );
}
