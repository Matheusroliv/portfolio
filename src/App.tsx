import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Navbar from "./components/Navbar"
import SeoTitle from "./components/SeoTitle"
import { LocaleProvider } from "./contexts/LocaleContext"

import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import SiteViewer from "./pages/SiteViewer"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <SeoTitle />
              <Navbar />

              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sites" element={<Navigate to="/#sites" replace />} />
                <Route path="/sites/:slug/*" element={<SiteViewer />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
