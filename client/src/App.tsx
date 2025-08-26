import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Doctors from "@/pages/Doctors";
import DoctorDetail from "@/pages/DoctorDetail";
import Booking from "@/pages/Booking";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Contact from "@/pages/Contact";
import Complaints from "@/pages/Complaints";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/services/:serviceId" component={ServiceDetail} />
        <Route path="/doctors" component={Doctors} />
        <Route path="/doctors/:doctorId" component={DoctorDetail} />
        <Route path="/booking" component={Booking} />
        <Route path="/articles" component={Articles} />
        <Route path="/articles/:articleId" component={ArticleDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/complaints" component={Complaints} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
