import { AppointmentServiceArea } from "@/types";
import { spouseVisaEvidenceByCategory } from "@/data/immigration-rules/spouse-visa";
import { CheckSquare } from "lucide-react";

// Dynamic document checklists: which list is shown, and which items within
// it, depend on the answers already collected — never one universal list.
function getChecklist(serviceArea: AppointmentServiceArea, answers: Record<string, any>): { title: string; items: string[] } {
  if (serviceArea === "immigration") {
    if (answers.applicationType === "spouse-partner") {
      return {
        title: "Spouse / Partner visa — likely documents",
        items: [
          "Passports (current and any expired ones showing UK visits)",
          "Evidence of your relationship (photos, messages, joint bills, tenancy)",
          "Financial evidence — see your specific category below",
          "Evidence of suitable accommodation",
          ...spouseVisaEvidenceByCategory["employment-uk"].slice(0, 2),
        ],
      };
    }
    if (answers.applicationType === "skilled-worker") {
      return {
        title: "Skilled Worker visa — likely documents",
        items: ["Certificate of Sponsorship reference", "Passport", "Evidence of qualifications, if required for the role", "English language evidence"],
      };
    }
    if (answers.applicationType === "ilr") {
      return {
        title: "ILR — likely documents",
        items: ["Passports covering your qualifying period", "Evidence of continuous residence (payslips, bank statements)", "English language and Life in the UK test certificates"],
      };
    }
    return { title: "Immigration — general documents", items: ["Passport and any current visa", "Evidence relevant to your specific application", "Any previous Home Office correspondence"] };
  }

  if (serviceArea === "tax") {
    return { title: "Tax — likely documents", items: ["P45 or P60", "Recent payslips", "Any HMRC correspondence", "Self-assessment records, if self-employed"] };
  }

  if (serviceArea === "benefits") {
    return { title: "Benefits — likely documents", items: ["Recent award notices or decision letters", "Evidence of income and housing costs", "Details of your household circumstances"] };
  }

  return { title: "General — useful to bring", items: ["Any correspondence relevant to your matter", "A short written summary of your situation, if you have one"] };
}

export function DocumentChecklist({ serviceArea, answers }: { serviceArea: AppointmentServiceArea; answers: Record<string, any> }) {
  const { title, items } = getChecklist(serviceArea, answers);
  return (
    <div className="rounded-2xl border border-navy-100 p-6">
      <p className="mb-4 font-semibold text-navy-900">{title}</p>
      <ul className="space-y-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-navy-600">
            <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-red-500" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
