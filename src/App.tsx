import ThemeSwitch from "@/components/ThemeSwitch";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LanguageSwitch from "./components/LanguageSwitch";
import SeoTitle from "./components/SeoTitle";
import { LocaleProvider } from "./contexts/LocaleContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <SeoTitle />
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <header className="fixed top-4 right-4 z-50 flex gap-4 items-center">
              <LanguageSwitch />
              <ThemeSwitch />
            </header>

            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
