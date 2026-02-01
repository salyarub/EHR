import apiClient from './client';
import type { PatientListItem } from './patients';

export interface DashboardStats {
    total_patients: number;
    today_appointments: number;
    pending_prescriptions: number;
    lab_results_ready: number;
}

export const dashboardAPI = {
    getStats: async (): Promise<DashboardStats> => {
        const response = await apiClient.get('/dashboard/stats/');
        return response.data;
    },

    getRecentPatients: async (): Promise<PatientListItem[]> => {
        const response = await apiClient.get('/patients/recent/');
        return response.data;
    },
};
