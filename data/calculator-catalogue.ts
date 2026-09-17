// Full inventory of planned calculators. Ones with a matching entry in
// lib/calculators/registry.ts are fully interactive; the rest render as
// "coming soon" cards on the /calculators hub so the information
// architecture is complete even before every tool is built out.

export interface CatalogueEntry {
  slug: string;
  title: string;
  category:
    | "tax"
    | "salary"
    | "self-employment"
    | "benefits"
    | "immigration"
    | "employment"
    | "business"
    | "property"
    | "other";
  description: string;
  builtId?: string; // matches CalculatorDefinition.id if implemented
}

export const calculatorCatalogue: CatalogueEntry[] = [
  // TAX
  { slug: "tax/income-tax", title: "PAYE Income Tax Calculator", category: "tax", description: "Work out Income Tax and National Insurance on your salary.", builtId: "income-tax" },
  { slug: "tax/tax-refund", title: "Tax Refund Estimator", category: "tax", description: "Estimate whether you may have overpaid tax this year." },
  { slug: "tax/dividend-tax", title: "Dividend Tax Calculator", category: "tax", description: "Estimate tax due on dividend income alongside salary." },
  { slug: "tax/capital-gains-tax", title: "Capital Gains Tax Calculator", category: "tax", description: "Estimate CGT on the sale of property or other assets." },
  { slug: "tax/savings-interest", title: "Savings Interest Tax Calculator", category: "tax", description: "See how much of your savings interest is taxable." },
  { slug: "tax/rental-income", title: "Rental Income Tax Calculator", category: "tax", description: "Estimate tax on rental profit after allowable expenses." },
  { slug: "tax/vat", title: "VAT Calculator", category: "tax", description: "Add or remove VAT at the standard or reduced rate.", builtId: "vat" },
  { slug: "tax/employer-cost", title: "Employer Cost Calculator", category: "tax", description: "See the total cost of employing someone, including Employer NI." },

  // SALARY & PAY
  { slug: "salary/take-home-pay", title: "Take-Home Pay Calculator", category: "salary", description: "See your estimated net pay after tax, NI, pension and student loan.", builtId: "take-home-pay" },
  { slug: "salary/salary-converter", title: "Salary Converter", category: "salary", description: "Convert between hourly, weekly, monthly and annual pay.", builtId: "salary-converter" },
  { slug: "salary/overtime", title: "Overtime Pay Calculator", category: "salary", description: "Work out extra pay for overtime hours." },
  { slug: "salary/holiday-pay", title: "Holiday Pay Calculator", category: "salary", description: "Estimate holiday pay based on hours and pay patterns." },
  { slug: "salary/payslip-breakdown", title: "Payslip Breakdown Calculator", category: "salary", description: "Understand each line of a payslip." },
  { slug: "salary/gross-to-net", title: "Gross-to-Net Calculator", category: "salary", description: "Convert a gross salary into an estimated net figure." },
  { slug: "salary/net-to-gross", title: "Net-to-Gross Estimator", category: "salary", description: "Work backwards from a target take-home pay to a gross salary." },
  { slug: "salary/salary-sacrifice", title: "Salary Sacrifice Calculator", category: "salary", description: "See the effect of sacrificing salary for pension or benefits." },
  { slug: "salary/pension-contributions", title: "Pension Contribution Calculator", category: "salary", description: "Estimate tax relief on personal pension contributions." },

  // SELF-EMPLOYMENT
  { slug: "self-employment/tax", title: "Self-Employment Tax Calculator", category: "self-employment", description: "Estimate Income Tax and Class 4 NI on self-employed profit.", builtId: "self-employment-tax" },

  // BENEFITS
  { slug: "benefits/universal-credit", title: "Universal Credit Estimator", category: "benefits", description: "A step-by-step estimate of a possible monthly payment.", builtId: "universal-credit-estimator" },
  { slug: "benefits/child-benefit", title: "Child Benefit Calculator", category: "benefits", description: "Estimate Child Benefit and any High Income Charge." },
  { slug: "benefits/statutory-maternity-pay", title: "Statutory Maternity Pay Estimator", category: "benefits", description: "Estimate maternity pay from your employer." },
  { slug: "benefits/statutory-paternity-pay", title: "Statutory Paternity Pay Estimator", category: "benefits", description: "Estimate paternity pay entitlement." },
  { slug: "benefits/statutory-sick-pay", title: "Statutory Sick Pay Estimator", category: "benefits", description: "Estimate SSP for time off sick." },
  { slug: "benefits/carers-allowance", title: "Carer's Allowance Estimator", category: "benefits", description: "Check if your caring hours and earnings may qualify." },
  { slug: "benefits/pension-credit", title: "Pension Credit Estimator", category: "benefits", description: "Estimate whether Pension Credit may top up your income." },
  { slug: "benefits/council-tax-reduction", title: "Council Tax Reduction Guidance", category: "benefits", description: "Understand how Council Tax Reduction schemes generally work." },

  // IMMIGRATION
  { slug: "immigration/spouse-visa", title: "Spouse & Partner Visa Financial Requirement", category: "immigration", description: "Estimate whether your income and savings may meet the requirement.", builtId: "spouse-visa-financial-requirement" },
  { slug: "immigration/skilled-worker", title: "Skilled Worker Visa Salary Checker", category: "immigration", description: "Compare a job offer against the general salary thresholds.", builtId: "skilled-worker-salary-check" },
  { slug: "immigration/student-visa-funds", title: "Student Visa Financial Requirement", category: "immigration", description: "Estimate the maintenance funds you may need to show.", builtId: "student-visa-funds" },
  { slug: "immigration/ilr", title: "ILR / Settlement Eligibility Checker", category: "immigration", description: "A quick indicative check of your settlement timeline.", builtId: "ilr-eligibility" },
  { slug: "immigration/citizenship", title: "British Citizenship Eligibility Checker", category: "immigration", description: "An indicative check of your naturalisation timeline." },
  { slug: "immigration/visa-fee-estimator", title: "Visa & IHS Fee Estimator", category: "immigration", description: "Estimate application fees and the Immigration Health Surcharge." },

  // EMPLOYMENT
  { slug: "employment/redundancy-pay", title: "Statutory Redundancy Pay Calculator", category: "employment", description: "Estimate statutory redundancy entitlement." },
  { slug: "employment/notice-period", title: "Notice Period Calculator", category: "employment", description: "Work out minimum statutory notice periods." },

  // BUSINESS
  { slug: "business/corporation-tax", title: "Corporation Tax Estimator", category: "business", description: "Estimate a limited company's Corporation Tax." },
  { slug: "business/limited-vs-sole-trader", title: "Limited Company vs Sole Trader Comparison", category: "business", description: "Compare estimated take-home under each structure." },

  // PROPERTY
  { slug: "property/stamp-duty", title: "Stamp Duty (SDLT) Calculator", category: "property", description: "Estimate Stamp Duty Land Tax on a property purchase." },
  { slug: "property/buy-to-let-yield", title: "Buy-to-Let Yield Calculator", category: "property", description: "Estimate rental yield on a buy-to-let property." },

  // OTHER
  { slug: "other/inheritance-tax", title: "Inheritance Tax Estimator", category: "other", description: "Estimate a potential Inheritance Tax liability." },
];

export const calculatorCategories: { id: CatalogueEntry["category"]; label: string }[] = [
  { id: "tax", label: "Tax" },
  { id: "salary", label: "Salary & Pay" },
  { id: "self-employment", label: "Self-Employment" },
  { id: "benefits", label: "Benefits" },
  { id: "immigration", label: "Immigration & Visa" },
  { id: "employment", label: "Employment" },
  { id: "business", label: "Business" },
  { id: "property", label: "Property" },
  { id: "other", label: "Other UK Calculators" },
];
