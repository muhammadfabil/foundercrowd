import { NextResponse } from "next/server";

import {
  CONTACT_FORM_BEEHIIV_SETTINGS,
  CONTACT_FORM_FIELDS,
  type BeehiivCustomFieldKind,
  type ContactFormField,
} from "@/lib/contact-form-fields";
import { subscribeContactLead, type BeehiivCustomFieldValue } from "@/lib/beehiiv";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = Record<string, unknown>;

function isFilled(value: unknown) {
  return typeof value === "string" ? value.trim().length > 0 : Boolean(value);
}

function normalizeFieldValue(field: ContactFormField, value: unknown) {
  if (field.type === "checkbox") {
    return value === true || value === "true" || value === "on";
  }

  if (typeof value !== "string") return "";

  const trimmedValue = value.trim();
  if (field.maxLength && trimmedValue.length > field.maxLength) {
    return trimmedValue.slice(0, field.maxLength);
  }

  return trimmedValue;
}

function validateSelectField(field: ContactFormField, value: string) {
  if (!value) return true;
  return field.options?.some((option) => option.value === value) ?? true;
}

function getCustomFieldDefinitions() {
  return CONTACT_FORM_FIELDS.flatMap((field) => {
    if (!field.beehiivFieldName || !field.beehiivKind) return [];

    return [
      {
        display: field.beehiivFieldName,
        kind: field.beehiivKind as BeehiivCustomFieldKind,
      },
    ];
  });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => null)) as ContactPayload | null;

    if (!payload) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const values: Record<string, string | boolean> = {};
    const customFields: BeehiivCustomFieldValue[] = [];
    const errors: Record<string, string> = {};

    for (const field of CONTACT_FORM_FIELDS) {
      const normalizedValue = normalizeFieldValue(field, payload[field.name]);
      values[field.name] = normalizedValue;

      if (field.required) {
        const hasRequiredValue = field.type === "checkbox" ? normalizedValue === true : isFilled(normalizedValue);
        if (!hasRequiredValue) {
          errors[field.name] = `${field.label} is required.`;
          continue;
        }
      }

      if (field.type === "select" && typeof normalizedValue === "string" && !validateSelectField(field, normalizedValue)) {
        errors[field.name] = `${field.label} has an invalid option.`;
        continue;
      }

      if (field.beehiivFieldName && normalizedValue !== "" && normalizedValue !== false) {
        customFields.push({
          name: field.beehiivFieldName,
          value: normalizedValue,
        });
      }
    }

    const email = typeof values.email === "string" ? values.email.toLowerCase() : "";
    if (!EMAIL_PATTERN.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Please check the form fields.", errors }, { status: 400 });
    }

    await subscribeContactLead({
      email,
      customFields,
      customFieldDefinitions: getCustomFieldDefinitions(),
      reactivateExisting: CONTACT_FORM_BEEHIIV_SETTINGS.reactivateExisting,
      sendWelcomeEmail: CONTACT_FORM_BEEHIIV_SETTINGS.sendWelcomeEmail,
      doubleOptOverride: CONTACT_FORM_BEEHIIV_SETTINGS.doubleOptOverride,
      utmSource: CONTACT_FORM_BEEHIIV_SETTINGS.utmSource,
      utmMedium: CONTACT_FORM_BEEHIIV_SETTINGS.utmMedium,
      utmCampaign: CONTACT_FORM_BEEHIIV_SETTINGS.utmCampaign,
      referringSite: request.headers.get("referer") || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Beehiiv contact submission failed", error);

    return NextResponse.json(
      { error: "We couldn't send your request right now. Please try again." },
      { status: 502 }
    );
  }
}
