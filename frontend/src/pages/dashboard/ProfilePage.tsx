import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Save, Loader2, Camera, Activity } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { authAPI } from '../../api/auth';

const profileSchema = z.object({
    first_name: z.string().min(1, 'required'),
    last_name: z.string().min(1, 'required'),
    email: z.string().email('invalid_email'),
    phone_number: z.string().optional(),
    avatar: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    const { lang } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    const firstName = watch('first_name');
    const lastName = watch('last_name');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const data = await authAPI.getProfile();
                reset({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    phone_number: data.phone_number || '',
                });
                if (data.profile_image) {
                    setImagePreview(data.profile_image);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                console.error('Failed to fetch profile:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                const errorDetail = (error as any)?.response?.data?.detail || (error as any)?.response?.statusText || '';
                setMessage({
                    type: 'error',
                    text: `${lang === 'ar' ? 'فشل تحميل البيانات' : 'Failed to load profile'} (${errorDetail || errorMessage})`
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [reset, lang]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue('avatar', file);
        }
    };

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setIsSaving(true);
            setMessage(null);

            const formData = new FormData();
            formData.append('first_name', data.first_name);
            formData.append('last_name', data.last_name);
            formData.append('email', data.email);
            if (data.phone_number) formData.append('phone_number', data.phone_number);
            if (data.avatar) formData.append('profile_image', data.avatar);

            await authAPI.updateProfile(formData);
            setMessage({ type: 'success', text: lang === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully' });
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage({ type: 'error', text: lang === 'ar' ? 'فشل تحديث البيانات' : 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header / Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

                <div className="relative flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center text-3xl font-bold shadow-lg overflow-hidden">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <>
                                    {firstName?.[0]?.toUpperCase() || 'U'}
                                    {lastName?.[0]?.toUpperCase() || ''}
                                </>
                            )}
                        </div>
                        <label className="absolute bottom-0 right-0 p-1.5 bg-white text-teal-600 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                            <Camera className="w-4 h-4" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                    <div className="text-center md:text-start">
                        <h1 className="text-3xl font-bold">
                            {firstName} {lastName}
                        </h1>
                        <p className="opacity-80 mt-1">{lang === 'ar' ? 'قم بتحديث معلوماتك وصورتك الشخصية' : 'Update your photo and personal details'}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Side Info */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Activity className="w-5 h-5 text-teal-500" />
                            {lang === 'ar' ? 'نظرة عامة' : 'Overview'}
                        </h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                    {lang === 'ar' ? 'تاريخ التسجيل' : 'Member Since'}
                                </span>
                                <span className="font-medium text-gray-900 dark:text-white">
                                    Jan 2026
                                </span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                                    {lang === 'ar' ? 'الدور الوظيفي' : 'Role'}
                                </span>
                                <span className="font-medium text-teal-600 dark:text-teal-400">
                                    Doctor
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {lang === 'ar' ? 'تعديل البيانات' : 'Edit Profile'}
                            </h2>
                        </div>

                        {/* Message */}
                        {message && (
                            <div className={`mx-6 mt-6 p-4 rounded-xl flex items-center gap-2 text-sm font-medium animate-in slide-in-from-top-2 ${message.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-200'
                                : 'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* First Name */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-teal-600">
                                        {lang === 'ar' ? 'الاسم الأول' : 'First Name'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                            <User className="w-5 h-5 rtl:mr-3 rtl:right-auto rtl:left-0" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register('first_name')}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 rtl:pl-10 rtl:pr-4"
                                        />
                                    </div>
                                    {errors.first_name && (
                                        <p className="mt-1 text-xs text-red-500">{lang === 'ar' ? 'مطلوب' : 'Required'}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-teal-600">
                                        {lang === 'ar' ? 'اسم العائلة' : 'Last Name'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                            <User className="w-5 h-5 rtl:mr-3 rtl:right-auto rtl:left-0" />
                                        </div>
                                        <input
                                            type="text"
                                            {...register('last_name')}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 rtl:pl-10 rtl:pr-4"
                                        />
                                    </div>
                                    {errors.last_name && (
                                        <p className="mt-1 text-xs text-red-500">{lang === 'ar' ? 'مطلوب' : 'Required'}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="md:col-span-2 group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-teal-600">
                                        {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                            <Mail className="w-5 h-5 rtl:mr-3 rtl:right-auto rtl:left-0" />
                                        </div>
                                        <input
                                            type="email"
                                            {...register('email')}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 rtl:pl-10 rtl:pr-4"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">{lang === 'ar' ? 'بريد غير صالح' : 'Invalid email'}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-2 group">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors group-focus-within:text-teal-600">
                                        {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-500 transition-colors">
                                            <Phone className="w-5 h-5 rtl:mr-3 rtl:right-auto rtl:left-0" />
                                        </div>
                                        <input
                                            type="tel"
                                            {...register('phone_number')}
                                            className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 rtl:pl-10 rtl:pr-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="relative overflow-hidden group flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    {isSaving ? (
                                        <Loader2 className="w-5 h-5 animate-spin relative z-10" />
                                    ) : (
                                        <Save className="w-5 h-5 relative z-10" />
                                    )}
                                    <span className="relative z-10 font-medium">
                                        {lang === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
