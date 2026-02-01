import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
    Users,
    Calendar,
    FileText,
    FlaskConical,
    TrendingUp,
    TrendingDown,
    Plus,
    ArrowRight,
    ArrowLeft,
    Edit,
    Trash2,
} from 'lucide-react';
import AddPatientModal from '../../components/patients/AddPatientModal';
import { dashboardAPI, type DashboardStats } from '../../api/dashboard';
import type { PatientListItem } from '../../api/patients';
import { patientsAPI } from '../../api/patients';

const DashboardPage = () => {
    const { lang, t } = useLanguage();
    const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [recentPatients, setRecentPatients] = useState<PatientListItem[]>([]);
    const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
    const [editPatientId, setEditPatientId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch dashboard data
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [statsData, patientsData] = await Promise.all([
                dashboardAPI.getStats(),
                dashboardAPI.getRecentPatients(),
            ]);
            setStats(statsData);
            setRecentPatients(patientsData);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePatientAdded = () => {
        fetchDashboardData(); // Refresh data
    };

    const handleEdit = (id: number) => {
        setEditPatientId(id);
        setIsAddPatientOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا المريض؟' : 'Are you sure you want to delete this patient?')) {
            return;
        }

        try {
            await patientsAPI.delete(id);
            fetchDashboardData(); // Refresh list
        } catch (error) {
            console.error('Failed to delete patient:', error);
            alert(lang === 'ar' ? 'فشل حذف المريض' : 'Failed to delete patient');
        }
    };

    const statsConfig = [
        { key: 'total_patients', labelKey: 'total_patients', icon: Users, color: 'teal' },
        { key: 'today_appointments', labelKey: 'today_appointments', icon: Calendar, color: 'blue' },
        { key: 'pending_prescriptions', labelKey: 'pending_prescriptions', icon: FileText, color: 'amber' },
        { key: 'lab_results_ready', labelKey: 'lab_results_ready', icon: FlaskConical, color: 'purple' },
    ];

    const quickActions = [
        { labelKey: 'new_patient', icon: Users, color: 'teal', onClick: () => setIsAddPatientOpen(true) },
        { labelKey: 'new_appointment', icon: Calendar, color: 'blue' },
        { labelKey: 'new_prescription', icon: FileText, color: 'purple' },
    ];

    return (
        <div className="space-y-6">
            {/* Add Patient Modal */}
            {/* Add/Edit Patient Modal */}
            <AddPatientModal
                isOpen={isAddPatientOpen}
                onClose={() => {
                    setIsAddPatientOpen(false);
                    setEditPatientId(null);
                }}
                onSuccess={handlePatientAdded}
                patientId={editPatientId}
            />

            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {t('dashboard_welcome')} 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {lang === 'ar' ? 'إليك ملخص نشاطك اليوم' : "Here's your activity summary for today"}
                    </p>
                </div>
                <button
                    onClick={() => setIsAddPatientOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-xl transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    <span>{t('new_patient')}</span>
                </button>
            </div>

            {/* Stats Grid */}
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 animate-pulse"
                        >
                            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsConfig.map((config) => {
                        const Icon = config.icon;
                        const value = stats?.[config.key as keyof DashboardStats] ?? 0;
                        return (
                            <div
                                key={config.key}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.color === 'teal' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' :
                                        config.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                            config.color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                                                'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                                        }`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                                    {value.toLocaleString()}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {t(config.labelKey as any)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('quick_actions')}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all duration-300 hover:shadow-md ${action.color === 'teal'
                                    ? 'border-teal-300 dark:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-teal-600 dark:text-teal-400'
                                    : action.color === 'blue'
                                        ? 'border-blue-300 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400'
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/30' :
                                    action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                        'bg-purple-100 dark:bg-purple-900/30'
                                    }`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="font-medium">{t(action.labelKey as any)}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {lang === 'ar' ? 'آخر المرضى' : 'Recent Patients'}
                    </h2>
                    <button className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-sm font-medium hover:underline">
                        <span>{t('view_all')}</span>
                        <ArrowIcon className="w-4 h-4" />
                    </button>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                        </div>
                    ) : recentPatients.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                            {lang === 'ar' ? 'لا يوجد مرضى حتى الآن' : 'No patients yet'}
                        </div>
                    ) : (
                        recentPatients.map((patient) => (
                            <div
                                key={patient.id}
                                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 flex items-center justify-center text-white font-bold">
                                        {patient.full_name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {patient.full_name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{patient.national_id}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                                        {patient.age ? `${patient.age} ${lang === 'ar' ? 'سنة' : 'years'}` : '-'}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                        {patient.gender === 'M' ? (lang === 'ar' ? 'ذ' : 'M') : (lang === 'ar' ? 'أ' : 'F')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 ms-4">
                                    <button
                                        onClick={() => handleEdit(patient.id)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                        title={lang === 'ar' ? 'تعديل' : 'Edit'}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(patient.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                        title={lang === 'ar' ? 'حذف' : 'Delete'}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
