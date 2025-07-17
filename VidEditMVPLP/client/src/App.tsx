import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { HomePage } from "./pages/HomePage"
import { BlankPage } from "./pages/BlankPage"
import { TermsPage } from "./pages/TermsPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import ThankYouPage from "./pages/ThankYouPage"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/thankyou" element={<ThankYouPage />} />
            <Route path="*" element={<BlankPage />} />
          </Routes>
        </Router>
        <Toaster />
      </>
    </ThemeProvider>
  )
}

export default App