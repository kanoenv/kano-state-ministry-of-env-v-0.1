
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import CatchAllRoute from "./components/routing/CatchAllRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Programs from "./pages/Programs";
import Agencies from "./pages/Agencies";
import ProgramREMASAB from "./pages/programs/REMASAB";
import WECCMA from "./pages/programs/WECCMA";
import SKP from "./pages/programs/SKP";
import KNAP from "./pages/programs/KNAP";
import WasteManagement from "./pages/programs/WasteManagement";
import PollutionLab from "./pages/programs/PollutionLab";
import ClimateActionPlan from "./pages/programs/ClimateActionPlan";
import DorayiCompostPlant from "./pages/programs/DorayiCompostPlant";
import UrbanGreening from "./pages/programs/UrbanGreening";
import SensitizationCampaign from "./pages/programs/SensitizationCampaign";
import FiveMillionTrees from "./pages/programs/FiveMillionTrees";
import FiveMillionTreesApply from "./pages/programs/FiveMillionTreesApply";
import FiveMillionTreesSuccess from "./pages/programs/FiveMillionTreesSuccess";
import Departments from "./pages/Departments";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ReportIssue from "./pages/ReportIssue";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import BannerManagement from "./pages/admin/BannerManagement";
import Reports from "./pages/admin/Reports";
import ContentManagement from "./pages/admin/ContentManagement";
import AdminAirQuality from "./pages/admin/AirQuality";
import Recruitment from "./pages/admin/Recruitment";
import TreeCampaignApplications from "./pages/admin/TreeCampaignApplications";
import AdminManagement from "./pages/admin/AdminManagement";
import ProgramManagement from "./pages/admin/ProgramManagement";
import CareerManagement from "./pages/admin/CareerManagement";
import ForestGuard from "./pages/careers/ForestGuard";
import ForestGuardApply from "./pages/careers/ForestGuardApply";
import ForestGuardSuccess from "./pages/careers/ForestGuardSuccess";
import MonitoringOverview from "./pages/monitoring/MonitoringOverview";
import MonitoringAirQuality from "./pages/monitoring/AirQuality";
import WaterQuality from "./pages/monitoring/WaterQuality";
import ErosionMaps from "./pages/monitoring/ErosionMaps";
import TreePlanting from "./pages/monitoring/TreePlanting";
import AgenciesOverview from "./pages/agencies/AgenciesOverview";
import Afforestation from "./pages/agencies/Afforestation";
import RenewableEnergy from "./pages/agencies/RenewableEnergy";
import GetInvolved from "./pages/GetInvolved";
import Volunteer from "./pages/get-involved/Volunteer";
import PPP from "./pages/get-involved/PPP";
import News from "./pages/News";
import PressReleases from "./pages/news/PressReleases";
import Events from "./pages/news/Events";
import Laws from "./pages/resources/Laws";
import Guidelines from "./pages/resources/Guidelines";
import FAQs from "./pages/resources/FAQs";
import AirQuality from "./pages/AirQuality";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { useAdminAuth } from "./context/AdminAuthContext";
import PdfManagementPage from "./pages/admin/PdfManagement";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Accessibility from "./pages/Accessibility";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Route guard for admin routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }
  
  return <>{children}</>;
};

// Prevent authenticated users from accessing login page
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAdminAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/agencies" element={<Agencies />} />
        
        {/* Programs Routes */}
        <Route path="/programs/remasab" element={<ProgramREMASAB />} />
        <Route path="/programs/weccma" element={<WECCMA />} />
        <Route path="/programs/skp" element={<SKP />} />
        <Route path="/programs/knap" element={<KNAP />} />
        <Route path="/programs/dorayi-compost-plant" element={<DorayiCompostPlant />} />
        <Route path="/programs/urban-greening" element={<UrbanGreening />} />
        <Route path="/programs/sensitization-campaign" element={<SensitizationCampaign />} />
        <Route path="/programs/waste-management" element={<WasteManagement />} />
        <Route path="/programs/pollution-lab" element={<PollutionLab />} />
        <Route path="/programs/climate-action-plan" element={<ClimateActionPlan />} />
        <Route path="/programs/five-million-trees" element={<FiveMillionTrees />} />
        <Route path="/programs/five-million-trees/apply" element={<FiveMillionTreesApply />} />
        <Route path="/programs/five-million-trees/success" element={<FiveMillionTreesSuccess />} />
        
        {/* Agencies Routes */}
        <Route path="/agencies/remasab" element={<WECCMA />} />
        <Route path="/agencies/weccma" element={<WECCMA />} />
        <Route path="/agencies/waste-management" element={<WasteManagement />} />
        <Route path="/agencies/pollution-lab" element={<PollutionLab />} />
        <Route path="/agencies/climate-action-plan" element={<ClimateActionPlan />} />
        <Route path="/agencies/skp" element={<SKP />} />
        <Route path="/agencies/knap" element={<KNAP />} />
        <Route path="/agencies/afforestation" element={<Afforestation />} />
        <Route path="/agencies/planting" element={<Afforestation />} />
        <Route path="/agencies/renewable-energy" element={<RenewableEnergy />} />
        
        <Route path="/departments" element={<Departments />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        
        {/* Air Quality Route - NEW */}
        <Route path="/air-quality" element={<AirQuality />} />
        
        {/* Legal Pages */}
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/accessibility" element={<Accessibility />} />
        
        {/* Monitoring Routes */}
        <Route path="/monitoring" element={<MonitoringOverview />} />
        <Route path="/monitoring/air-quality" element={<Navigate to="/air-quality" replace />} />
        <Route path="/monitoring/water-quality" element={<WaterQuality />} />
        <Route path="/monitoring/erosion-maps" element={<ErosionMaps />} />
        <Route path="/monitoring/tree-planting" element={<TreePlanting />} />
        
        {/* Get Involved Routes */}
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/get-involved/volunteer" element={<Volunteer />} />
        <Route path="/get-involved/ppp" element={<PPP />} />
        <Route path="/get-involved/tree-planting" element={<FiveMillionTreesApply />} />
        
        {/* News Routes */}
        <Route path="/news" element={<News />} />
        <Route path="/news/press-releases" element={<PressReleases />} />
        <Route path="/news/events" element={<Events />} />
        
        {/* Resources Routes */}
        <Route path="/resources/laws" element={<Laws />} />
        <Route path="/resources/guidelines" element={<Guidelines />} />
        <Route path="/resources/faqs" element={<FAQs />} />
        
        {/* Career Routes */}
        <Route path="/careers" element={<Navigate to="/careers/forest-guard" replace />} />
        <Route path="/careers/forest-guard" element={<ForestGuard />} />
        <Route path="/careers/forest-guard/apply" element={<ForestGuardApply />} />
        <Route path="/careers/forest-guard/success" element={<ForestGuardSuccess />} />
        
        {/* Admin Authentication Route */}
        <Route path="/admin-login" element={<AuthRoute><AdminLogin /></AuthRoute>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/banners" element={<ProtectedRoute><BannerManagement /></ProtectedRoute>} />
        <Route path="/admin/programs" element={<ProtectedRoute><ProgramManagement /></ProtectedRoute>} />
        <Route path="/admin/careers" element={<ProtectedRoute><CareerManagement /></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/admin/content" element={<ProtectedRoute><ContentManagement /></ProtectedRoute>} />
        <Route path="/admin/air-quality" element={<ProtectedRoute><AdminAirQuality /></ProtectedRoute>} />
        <Route path="/admin/recruitment" element={<ProtectedRoute><Recruitment /></ProtectedRoute>} />
        <Route path="/admin/tree-campaign" element={<ProtectedRoute><TreeCampaignApplications /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminManagement /></ProtectedRoute>} />
        <Route path="/admin/pdfs" element={<ProtectedRoute><PdfManagementPage /></ProtectedRoute>} />
        
        {/* Catch-all Route */}
        <Route path="*" element={<CatchAllRoute />} />
      </Routes>
    </ErrorBoundary>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AdminAuthProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </AdminAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
