import * as Yup from "yup";

export const appointmentSchema = Yup.object({
  fullName: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .required("Full name is required"),
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(8, "Phone number must be at least 8 digits")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .optional(),
  service: Yup.string()
    .oneOf(["general", "cardiology", "orthopedics", "pediatrics", "dermatology", "laboratory"], "Please select a valid service")
    .required("Please select a service"),
  date: Yup.string()
    .required("Please select a date")
    .test("future-date", "Please select a future date", function(value) {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
  time: Yup.string()
    .optional(),
  notes: Yup.string()
    .max(500, "Notes must be less than 500 characters")
    .optional(),
});

export const contactSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .optional(),
  subject: Yup.string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters")
    .required("Subject is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
  type: Yup.string()
    .oneOf(["contact", "complaint"], "Invalid type")
    .default("contact"),
});

export type AppointmentFormData = Yup.InferType<typeof appointmentSchema>;
export type ContactFormData = Yup.InferType<typeof contactSchema>;
