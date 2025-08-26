import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { appointmentSchema, type AppointmentFormData } from "@/lib/validationSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, CheckCircle } from "lucide-react";

export default function Booking() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const createAppointmentMutation = useMutation({
    mutationFn: async (data: AppointmentFormData) => {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: true, id: Math.random().toString(36).slice(2) };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["static-appointments"] });
      setIsSubmitted(true);
      toast({
        title: language === "en" ? "Appointment Booked!" : "تم حجز الموعد!",
        description: language === "en" ? 
          "Your appointment has been successfully booked. We will contact you soon." :
          "تم حجز موعدك بنجاح. سنتواصل معك قريباً.",
      });
    },
    onError: (error: any) => {
      toast({
        title: language === "en" ? "Booking Failed" : "فشل في الحجز",
        description: error.message || (language === "en" ? "Please try again later." : "يرجى المحاولة مرة أخرى لاحقاً."),
        variant: "destructive",
      });
    },
  });

  const formik = useFormik<AppointmentFormData>({
    initialValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    },
    validationSchema: appointmentSchema,
    onSubmit: (values) => {
      createAppointmentMutation.mutate(values);
    },
  });

  const services = [
    { value: "general", label: t("services.general") },
    { value: "cardiology", label: t("services.cardiology") },
    { value: "orthopedics", label: t("services.orthopedics") },
    { value: "pediatrics", label: t("services.pediatrics") },
    { value: "dermatology", label: t("services.dermatology") },
    { value: "laboratory", label: t("services.laboratory") },
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              {language === "en" ? "Appointment Confirmed!" : "تم تأكيد الموعد!"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {language === "en" ? 
                "Thank you for booking with Hala Care. We will contact you within 24 hours to confirm your appointment details." :
                "شكراً لحجزك مع مركز حلا. سنتواصل معك خلال 24 ساعة لتأكيد تفاصيل موعدك."}
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="w-full"
              data-testid="button-book-another"
            >
              {language === "en" ? "Book Another Appointment" : "احجز موعد آخر"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-primary to-primary-dark text-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            {language === "en" ? "Book Your Appointment" : "احجز موعدك"}
          </h1>
          <p className="text-xl opacity-90">
            {language === "en" ? 
              "Schedule your visit with our expert medical team. We're here to provide you with the best healthcare experience." :
              "حدد موعد زيارتك مع فريقنا الطبي المتخصص. نحن هنا لنوفر لك أفضل تجربة رعاية صحية."}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-center">
                {language === "en" ? "Appointment Details" : "تفاصيل الموعد"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName" className="text-white mb-2 block">
                      {language === "en" ? "Full Name" : "الاسم الكامل"}
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                      placeholder={language === "en" ? "Enter your full name" : "أدخل اسمك الكامل"}
                      data-testid="input-full-name"
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <p className="text-red-300 text-sm mt-1">{formik.errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      {language === "en" ? "Phone Number" : "رقم الهاتف"}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                      placeholder={language === "en" ? "Enter your phone number" : "أدخل رقم هاتفك"}
                      data-testid="input-phone"
                    />
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-300 text-sm mt-1">{formik.errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    {language === "en" ? "Email (Optional)" : "البريد الإلكتروني (اختياري)"}
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                    placeholder={language === "en" ? "Enter your email address" : "أدخل بريدك الإلكتروني"}
                    data-testid="input-email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-300 text-sm mt-1">{formik.errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">
                      {language === "en" ? "Service" : "الخدمة"}
                    </Label>
                    <Select
                      name="service"
                      value={formik.values.service}
                      onValueChange={(value) => formik.setFieldValue("service", value)}
                    >
                      <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-white/50" data-testid="select-service">
                        <SelectValue placeholder={language === "en" ? "Select a service" : "اختر خدمة"} />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {formik.touched.service && formik.errors.service && (
                      <p className="text-red-300 text-sm mt-1">{formik.errors.service}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-white mb-2 block">
                      {language === "en" ? "Preferred Date" : "التاريخ المفضل"}
                    </Label>
                    <Input
                      id="date"
                      name="date"
                      type="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-white/20 border-white/30 text-white focus:border-white/50"
                      data-testid="input-date"
                    />
                    {formik.touched.date && formik.errors.date && (
                      <p className="text-red-300 text-sm mt-1">{formik.errors.date}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="time" className="text-white mb-2 block">
                    {language === "en" ? "Preferred Time (Optional)" : "الوقت المفضل (اختياري)"}
                  </Label>
                  <Select
                    name="time"
                    value={formik.values.time}
                    onValueChange={(value) => formik.setFieldValue("time", value)}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white focus:border-white/50" data-testid="select-time">
                      <SelectValue placeholder={language === "en" ? "Select preferred time" : "اختر الوقت المفضل"} />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-white mb-2 block">
                    {language === "en" ? "Additional Notes" : "ملاحظات إضافية"}
                  </Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:border-white/50"
                    placeholder={language === "en" ? "Any specific concerns or requirements" : "أي مخاوف أو متطلبات محددة"}
                    data-testid="textarea-notes"
                  />
                  {formik.touched.notes && formik.errors.notes && (
                    <p className="text-red-300 text-sm mt-1">{formik.errors.notes}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={createAppointmentMutation.isPending}
                  className="w-full bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-submit-appointment"
                >
                  {createAppointmentMutation.isPending ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      <span>{t("common.loading")}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calendar size={20} />
                      <span>{t("hero.book_appointment")}</span>
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
