import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { patientsAPI, type CreatePatientRequest } from '../../api/patients';

// Validation schema
const patientSchema = z.object({
    national_id: z.string().min(1, 'required'),
    first_name: z.string().min(1, 'required'),
    last_name: z.string().min(1, 'required'),
    date_of_birth: z.string().min(1, 'required'),
    gender: z.enum(['M', 'F']),
    phone_number: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    address: z.string().optional(),
    blood_type: z.string().optional(),
    allergies: z.string().optional(),
    chronic_conditions: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_phone: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface AddPatientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    patientId?: number | null;
}

const AddPatientModal = ({ isOpen, onClose, onSuccess, patientId }: AddPatientModalProps) => {
    const { lang, t } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PatientFormData>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            gender: 'M',
        },
    });

    // Fetch patient details when editing
    useEffect(() => {
        if (isOpen) {
            setError(null); // Clear errors when modal opens

            if (patientId) {
                const fetchPatient = async () => {
                    try {
                        setIsLoading(true);
                        const data = await patientsAPI.getById(patientId);
                        // Reset form with patient data
                        reset({
                            national_id: data.national_id,
                            first_name: data.first_name,
                            last_name: data.last_name,
                            date_of_birth: data.date_of_birth,
                            gender: data.gender,
                            phone_number: data.phone_number || '',
                            email: data.email || '',
                            address: data.address || '',
                            blood_type: data.blood_type || '',
                            allergies: data.allergies || '',
                            chronic_conditions: data.chronic_conditions || '',
                            emergency_contact_name: data.emergency_contact_name || '',
                            emergency_contact_phone: data.emergency_contact_phone || '',
                        });
                    } catch (err) {
                        setError('Failed to load patient details');
                        console.error(err);
                    } finally {
                        setIsLoading(false);
                    }
                };
                fetchPatient();
            } else {
                // Reset to default for new patient with explicit empty values
                reset({
                    national_id: '',
                    first_name: '',
                    last_name: '',
                    date_of_birth: '',
                    gender: 'M',
                    phone_number: '',
                    email: '',
                    address: '',
                    blood_type: '',
                    allergies: '',
                    chronic_conditions: '',
                    emergency_contact_name: '',
                    emergency_contact_phone: ''
                });
            }
        }
    }, [isOpen, patientId, reset]);

    const onSubmit = async (data: PatientFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            // Clean up empty optional fields
            const cleanData: CreatePatientRequest = {
                ...data,
                email: data.email || undefined,
                phone_number: data.phone_number || undefined,
                address: data.address || undefined,
                blood_type: data.blood_type || undefined,
                allergies: data.allergies || undefined,
                chronic_conditions: data.chronic_conditions || undefined,
                emergency_contact_name: data.emergency_contact_name || undefined,
                emergency_contact_phone: data.emergency_contact_phone || undefined,
            };

            if (patientId) {
                await patientsAPI.update(patientId, cleanData);
            } else {
                await patientsAPI.create(cleanData);
            }

            reset();
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error(err);
            if (err.response?.data) {
                const data = err.response.data;
                if (data.national_id) {
                    setError(lang === 'ar' ? 'يوجد مريض مسجل بهذا الرقم الوطني بالفعل' : 'A patient with this National ID already exists');
                    return;
                }
                if (data.email) {
                    setError(lang === 'ar' ? 'هذا البريد الإلكتروني مستخدم بالفعل' : 'This email is already in use');
                    return;
                }
                if (data.message) {
                    setError(data.message);
                    return;
                }
            }
            setError(patientId
                ? (lang === 'ar' ? 'فشل تعديل بيانات المريض' : 'Failed to update patient')
                : (lang === 'ar' ? 'فشل إضافة المريض' : 'Failed to add patient')
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {patientId
                            ? (lang === 'ar' ? 'تعديل بيانات المريض' : 'Edit Patient')
                            : (lang === 'ar' ? 'إضافة مريض جديد' : 'Add New Patient')}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* National ID */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'الرقم الوطني' : 'National ID'} *
                            </label>
                            <input
                                type="text"
                                {...register('national_id')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                                placeholder={lang === 'ar' ? 'أدخل الرقم الوطني' : 'Enter national ID'}
                            />
                            {errors.national_id && (
                                <p className="mt-1 text-sm text-red-500">{lang === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required'}</p>
                            )}
                        </div>

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'الاسم الأول' : 'First Name'} *
                            </label>
                            <input
                                type="text"
                                {...register('first_name')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-500">{lang === 'ar' ? 'هذا الحقل مطلوب' : 'Required'}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'اسم العائلة' : 'Last Name'} *
                            </label>
                            <input
                                type="text"
                                {...register('last_name')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'} *
                            </label>
                            <input
                                type="date"
                                {...register('date_of_birth')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'الجنس' : 'Gender'} *
                            </label>
                            <select
                                {...register('gender')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            >
                                <option value="M">{lang === 'ar' ? 'ذكر' : 'Male'}</option>
                                <option value="F">{lang === 'ar' ? 'أنثى' : 'Female'}</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                            </label>
                            <input
                                type="tel"
                                {...register('phone_number')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                            </label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Address */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'العنوان' : 'Address'}
                            </label>
                            <input
                                type="text"
                                {...register('address')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Blood Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'فصيلة الدم' : 'Blood Type'}
                            </label>
                            <select
                                {...register('blood_type')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            >
                                <option value="">{lang === 'ar' ? 'اختر' : 'Select'}</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>

                        {/* Emergency Contact Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'جهة الاتصال الطارئة' : 'Emergency Contact'}
                            </label>
                            <input
                                type="text"
                                {...register('emergency_contact_name')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Emergency Contact Phone */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {lang === 'ar' ? 'هاتف جهة الاتصال الطارئة' : 'Emergency Contact Phone'}
                            </label>
                            <input
                                type="tel"
                                {...register('emergency_contact_phone')}
                                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                            {lang === 'ar' ? 'إلغاء' : 'Cancel'}
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-medium hover:from-teal-500 hover:to-blue-500 disabled:opacity-50 transition-all"
                        >
                            {isLoading
                                ? (lang === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                                : (patientId
                                    ? (lang === 'ar' ? 'حفظ التعديلات' : 'Update Patient')
                                    : (lang === 'ar' ? 'إضافة مريض' : 'Add Patient'))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatientModal;
