import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { contactSchema, type ContactFormData } from "@/lib/validationSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Send, CheckCircle, Shield, Lock, FileText } from "lucide-react";

export default function Complaints() {
  const { t, language, isRTL } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createComplaintMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-contacts"] });
      setIsSubmitted(true);
      toast({
        title: language === "en" ? "Complaint Submitted!" : "تم تقديم الشكوى!",
        description: language === "en" ? 
          "Your complaint has been received. We will investigate and respond within 48 hours." :
          "تم استلام شكواكم. سنقوم بالتحقيق والرد خلال 48 ساعة.",
      });
    },
    onError: (error: any) => {
      toast({
        title: language === "en" ? "Failed to Submit" : "فشل في التقديم",
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
      type: "complaint",
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      createComplaintMutation.mutate(values);
    },
  });

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {language === "en" ? "Complaint Received!" : "تم استلام الشكوى!"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === "en" ? 
                "Thank you for bringing this to our attention. We take all complaints seriously and will investigate within 48 hours." :
                "شكراً لتوجيه انتباهنا لهذا الأمر. نأخذ جميع الشكاوى بجدية وسنقوم بالتحقيق خلال 48 ساعة."}
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full"
                data-testid="button-submit-another"
              >
                {language === "en" ? "Submit Another Complaint" : "قدم شكوى أخرى"}
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "en" ? 
                  "Reference ID: CMP-" + Math.random().toString(36).substr(2, 9).toUpperCase() :
                  "رقم المرجع: CMP-" + Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="text-orange-600 dark:text-orange-400" size={32} />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            {language === "en" ? "Submit a Complaint" : "تقديم شكوى"}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {language === "en" ? 
              "Your feedback helps us improve our services. We take all complaints seriously and are committed to resolving issues promptly." :
              "ملاحظاتكم تساعدنا على تحسين خدماتنا. نأخذ جميع الشكاوى بجدية ونلتزم بحل المشاكل بسرعة."}
          </p>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {language === "en" ? "Confidential" : "سري"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? 
                  "All complaints are handled with strict confidentiality." :
                  "جميع الشكاوى تُعامل بسرية تامة."}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {language === "en" ? "Secure" : "آمن"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? 
                  "Your information is protected and secure." :
                  "معلوماتكم محمية وآمنة."}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                {language === "en" ? "Tracked" : "متابع"}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === "en" ? 
                  "All complaints are documented and tracked." :
                  "جميع الشكاوى موثقة ومتابعة."}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Complaint Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {language === "en" ? "Complaint Details" : "تفاصيل الشكوى"}
              </CardTitle>
            </CardHeader>
            <CardContent>
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
                    {language === "en" ? "Complaint Subject" : "موضوع الشكوى"}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    placeholder={language === "en" ? "Brief description of the issue" : "وصف مختصر للمشكلة"}
                    data-testid="input-subject"
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.subject}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    {language === "en" ? "Detailed Complaint" : "تفاصيل الشكوى"}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                    placeholder={language === "en" ? 
                      "Please provide detailed information about your complaint, including dates, names, and specific incidents..." :
                      "يرجى تقديم معلومات مفصلة عن شكواكم، بما في ذلك التواريخ والأسماء والحوادث المحددة..."}
                    data-testid="textarea-message"
                  />
                  {formik.touched.message && formik.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
                  )}
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className={`flex items-start space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                    <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <p className="font-semibold mb-1">
                        {language === "en" ? "Important Notice:" : "إشعار مهم:"}
                      </p>
                      <p>
                        {language === "en" ? 
                          "All complaints are taken seriously and will be investigated thoroughly. Please provide as much detail as possible to help us resolve your concern effectively." :
                          "جميع الشكاوى تؤخذ بجدية وسيتم التحقيق فيها بدقة. يرجى تقديم أكبر قدر من التفاصيل لمساعدتنا في حل مشكلتكم بفعالية."}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={createComplaintMutation.isPending}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-submit-complaint"
                >
                  {createComplaintMutation.isPending ? (
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t("common.loading")}</span>
                    </div>
                  ) : (
                    <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <Send size={20} />
                      <span>{language === "en" ? "Submit Complaint" : "قدم الشكوى"}</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
