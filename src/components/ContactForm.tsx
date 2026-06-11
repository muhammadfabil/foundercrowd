"use client";

import { useMemo, useState } from "react";

import { CONTACT_FORM_FIELDS, type ContactFormField } from "@/lib/contact-form-fields";

type ContactFormStatus = "idle" | "submitting" | "success" | "error";

function getInitialValues() {
  return Object.fromEntries(
    CONTACT_FORM_FIELDS.map((field) => [field.name, field.type === "checkbox" ? false : ""])
  ) as Record<string, string | boolean>;
}

function getFieldClassName(field: ContactFormField) {
  return field.width === "full" ? "md:col-span-2" : "";
}

function fieldBaseClassName() {
  return "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-[#2B2B2B] outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-[#5271ff] focus:ring-4 focus:ring-[#5271ff]/10 disabled:cursor-not-allowed disabled:bg-gray-50";
}

export default function ContactForm() {
  const initialValues = useMemo(() => getInitialValues(), []);
  const [values, setValues] = useState<Record<string, string | boolean>>(initialValues);
  const [status, setStatus] = useState<ContactFormStatus>("idle");
  const [error, setError] = useState("");

  const isSubmitting = status === "submitting";

  const updateField = (name: string, value: string | boolean) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Unable to send your request right now.");
      }

      setStatus("success");
      setValues(initialValues);
    } catch (submitError) {
      setStatus("error");
      setError(submitError instanceof Error ? submitError.message : "Unable to send your request right now.");
    }
  };

  const renderField = (field: ContactFormField) => {
    const value = values[field.name];
    const inputId = `contact-${field.name}`;

    if (field.type === "textarea") {
      return (
        <textarea
          id={inputId}
          name={field.name}
          required={field.required}
          disabled={isSubmitting}
          rows={field.rows ?? 4}
          maxLength={field.maxLength}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateField(field.name, event.target.value)}
          placeholder={field.placeholder}
          className={`${fieldBaseClassName()} min-h-36 resize-y`}
        />
      );
    }

    if (field.type === "select") {
      return (
        <select
          id={inputId}
          name={field.name}
          required={field.required}
          disabled={isSubmitting}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => updateField(field.name, event.target.value)}
          className={fieldBaseClassName()}
        >
          <option value="">{field.placeholder || "Select one"}</option>
          {field.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label
          htmlFor={inputId}
          className="flex min-h-14 items-start gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4 text-sm font-medium text-gray-700"
        >
          <input
            id={inputId}
            name={field.name}
            type="checkbox"
            required={field.required}
            disabled={isSubmitting}
            checked={value === true}
            onChange={(event) => updateField(field.name, event.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#5271ff] focus:ring-[#5271ff]"
          />
          <span>{field.label}</span>
        </label>
      );
    }

    return (
      <input
        id={inputId}
        name={field.name}
        type={field.type}
        required={field.required}
        disabled={isSubmitting}
        autoComplete={field.autoComplete}
        maxLength={field.maxLength}
        value={typeof value === "string" ? value : ""}
        onChange={(event) => updateField(field.name, event.target.value)}
        placeholder={field.placeholder}
        className={fieldBaseClassName()}
      />
    );
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-2xl shadow-gray-200/70 sm:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        {CONTACT_FORM_FIELDS.map((field) => (
          <div key={field.name} className={getFieldClassName(field)}>
            {field.type !== "checkbox" && (
              <label htmlFor={`contact-${field.name}`} className="mb-2 block text-sm font-semibold text-gray-800">
                {field.label}
                {field.required && <span className="text-[#5271ff]"> *</span>}
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>

      {status === "success" && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Your request has been sent.
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#5271ff] px-6 text-sm font-bold text-white transition-colors hover:bg-[#3d5ae0] disabled:cursor-not-allowed disabled:bg-[#5271ff]/70"
      >
        {isSubmitting ? "Sending..." : "Send Request"}
      </button>
    </form>
  );
}
