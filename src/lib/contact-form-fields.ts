export type ContactFieldType = "text" | "email" | "tel" | "textarea" | "select" | "checkbox";
export type ContactFieldWidth = "half" | "full";
export type BeehiivCustomFieldKind = "string" | "integer" | "boolean" | "date" | "datetime" | "list" | "double";

export type ContactFormFieldOption = {
  label: string;
  value: string;
};

export type ContactFormField = {
  name: string;
  label: string;
  type: ContactFieldType;
  required: boolean;
  placeholder?: string;
  autoComplete?: string;
  width?: ContactFieldWidth;
  options?: readonly ContactFormFieldOption[];
  rows?: number;
  maxLength?: number;
  beehiivFieldName?: string;
  beehiivKind?: BeehiivCustomFieldKind;
};

export const CONTACT_FORM_FIELDS: readonly ContactFormField[] = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Jane Doe",
    autoComplete: "name",
    width: "half",
    maxLength: 120,
    beehiivFieldName: "Contact Full Name",
    beehiivKind: "string",
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "jane@company.com",
    autoComplete: "email",
    width: "half",
    maxLength: 160,
  },
  {
    name: "company",
    label: "Company",
    type: "text",
    required: false,
    placeholder: "Company name",
    autoComplete: "organization",
    width: "half",
    maxLength: 140,
    beehiivFieldName: "Contact Company",
    beehiivKind: "string",
  },
  {
    name: "phone",
    label: "Phone / WhatsApp",
    type: "tel",
    required: false,
    placeholder: "+1 555 000 0000",
    autoComplete: "tel",
    width: "half",
    maxLength: 60,
    beehiivFieldName: "Contact Phone",
    beehiivKind: "string",
  },
  {
    name: "contactType",
    label: "I am contacting as",
    type: "select",
    required: true,
    placeholder: "Select one",
    width: "half",
    beehiivFieldName: "Contact Type",
    beehiivKind: "string",
    options: [
      { label: "Founder raising capital", value: "Founder raising capital" },
      { label: "Investor", value: "Investor" },
      { label: "M&A / acquisition", value: "M&A / acquisition" },
      { label: "Strategic partner", value: "Strategic partner" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "fundingStage",
    label: "Funding Stage",
    type: "select",
    required: false,
    placeholder: "Select stage",
    width: "half",
    beehiivFieldName: "Contact Funding Stage",
    beehiivKind: "string",
    options: [
      { label: "Pre-seed", value: "Pre-seed" },
      { label: "Seed", value: "Seed" },
      { label: "Series A", value: "Series A" },
      { label: "Series B+", value: "Series B+" },
      { label: "M&A", value: "M&A" },
      { label: "Not applicable", value: "Not applicable" },
    ],
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "Share a short summary of what you need help with.",
    width: "full",
    rows: 5,
    maxLength: 2000,
    beehiivFieldName: "Contact Message",
    beehiivKind: "string",
  },
  {
    name: "consent",
    label: "I agree to be contacted by Space Funding about this request.",
    type: "checkbox",
    required: true,
    width: "full",
    beehiivFieldName: "Contact Consent",
    beehiivKind: "boolean",
  },
] as const;

export const CONTACT_FORM_BEEHIIV_SETTINGS = {
  reactivateExisting: true,
  sendWelcomeEmail: false,
  doubleOptOverride: "off",
  utmSource: "website",
  utmMedium: "contact-form",
  utmCampaign: "contact-page",
} as const;
