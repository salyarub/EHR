import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';

// Placeholder pages for other routes
const PatientsPage = () => <div className="text-gray-900 dark:text-white">Patients Page - Coming Soon</div>;
const AppointmentsPage = () => <div className="text-gray-900 dark:text-white">Appointments Page - Coming Soon</div>;
const PrescriptionsPage = () => <div className="text-gray-900 dark:text-white">Prescriptions Page - Coming Soon</div>;
const LabResultsPage = () => <div className="text-gray-900 dark:text-white">Lab Results Page - Coming Soon</div>;
const ReportsPage = () => <div className="text-gray-900 dark:text-white">Reports Page - Coming Soon</div>;
const SettingsPage = () => <div className="text-gray-900 dark:text-white">Settings Page - Coming Soon</div>;

function App() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes - Auth Layout */}
                        <Route element={<AuthLayout />}>
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Route>

                        {/* Protected Routes - Dashboard Layout */}
                        <Route
                            element={
                                <ProtectedRoute>
                                    <DashboardLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/patients" element={<PatientsPage />} />
                            <Route path="/appointments" element={<AppointmentsPage />} />
                            <Route path="/prescriptions" element={<PrescriptionsPage />} />
                            <Route path="/lab-results" element={<LabResultsPage />} />
                            <Route path="/reports" element={<ReportsPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Route>

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
