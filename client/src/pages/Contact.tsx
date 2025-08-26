import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactSchema, type ContactFormData } from "@/lib/validationSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createContactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-contacts"] });
      setIsSubmitted(true);
      toast({
        title: language === "en" ? "Message Sent!" : "تم إرسال الرسالة!",
        description: language === "en" ? 
          "Thank you for contacting us. We will get back to you soon." :
          "شكراً لتواصلك معنا. سنعود إليك قريباً.",
      });
    },
    onError: (error: any) => {
      toast({
        title: language === "en" ? "Failed to Send" : "فشل في الإرسال",
        description: error.message || (language === "en" ? "Please try again later." : "يرجى المحاولة مرة أخرى لاحقاً."),
        variant: "destructive",
      });
    },
  });

  const formik = useFormik<ContactFormData>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      type: "contact",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      createContactMutation.mutate(values);
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {language === "en" ? "Message Sent!" : "تم إرسال الرسالة!"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === "en" ? 
                "Thank you for contacting Hala Care. We will respond to your message within 24 hours." :
                "شكراً لتواصلك مع مركز حلا. سنرد على رسالتك خلال 24 ساعة."}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="w-full"
              data-testid="button-send-another"
            >
              {language === "en" ? "Send Another Message" : "أرسل رسالة أخرى"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 bg-white dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? "Get in Touch" : "تواصل معنا"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === "en" ? 
              "We're here to help and answer any questions you might have. We look forward to hearing from you." :
              "نحن هنا للمساعدة والإجابة على أي أسئلة قد تكون لديكم. نتطلع إلى سماع رأيكم."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {language === "en" ? "Address" : "العنوان"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language === "en" ? 
                    "123 Medical Center Street\nHealthcare District\nRiyadh, Saudi Arabia 12345" :
                    "شارع المركز الطبي 123\nحي الرعاية الصحية\nالرياض، المملكة العربية السعودية 12345"}
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {language === "en" ? "Phone" : "الهاتف"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === "en" ? 
                    "+966 11 123 4567\nEmergency: +966 11 765 4321" :
                    "+966 11 123 4567\nالطوارئ: +966 11 765 4321"}
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {language === "en" ? "Email" : "البريد الإلكتروني"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  info@halacare.com<br />
                  appointments@halacare.com
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
              <div className="w-12 h-12 bg-accent/10 dark:bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="text-accent" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {language === "en" ? "Working Hours" : "ساعات العمل"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === "en" ? 
                    "Sunday - Thursday: 8:00 AM - 10:00 PM\nFriday - Saturday: 10:00 AM - 6:00 PM" :
                    "الأحد - الخميس: 8:00 ص - 10:00 م\nالجمعة - السبت: 10:00 ص - 6:00 م"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              {language === "en" ? "Send us a Message" : "أرسل لنا رسالة"}
            </h3>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    {language === "en" ? "First Name" : "الاسم الأول"}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    placeholder={language === "en" ? "Enter your first name" : "أدخل اسمك الأول"}
                    data-testid="input-first-name"
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.firstName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    {language === "en" ? "Last Name" : "الاسم الأخير"}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    placeholder={language === "en" ? "Enter your last name" : "أدخل اسمك الأخير"}
                    data-testid="input-last-name"
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  {language === "en" ? "Email" : "البريد الإلكتروني"}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  placeholder={language === "en" ? "Enter your email address" : "أدخل بريدك الإلكتروني"}
                  data-testid="input-email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  {language === "en" ? "Phone (Optional)" : "الهاتف (اختياري)"}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  placeholder={language === "en" ? "Enter your phone number" : "أدخل رقم هاتفك"}
                  data-testid="input-phone"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
                )}
              </div>

              <div>
                <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  {language === "en" ? "Subject" : "الموضوع"}
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  placeholder={language === "en" ? "Enter message subject" : "أدخل موضوع الرسالة"}
                  data-testid="input-subject"
                />
                {formik.touched.subject && formik.errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
                )}
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  {language === "en" ? "Message" : "الرسالة"}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                  placeholder={language === "en" ? "Enter your message" : "أدخل رسالتك"}
                  data-testid="textarea-message"
                />
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={createContactMutation.isPending}
                className="w-full bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                data-testid="button-send-message"
              >
                {createContactMutation.isPending ? (
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>{t("common.loading")}</span>
                  </div>
                ) : (
                  <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <Send size={20} />
                    <span>{language === "en" ? "Send Message" : "أرسل الرسالة"}</span>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
