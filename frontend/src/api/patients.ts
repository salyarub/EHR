import apiClient from './client';

export interface Patient {
    id: number;
    national_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: 'M' | 'F';
    phone_number?: string;
    email?: string;
    address?: string;
    blood_type?: string;
    allergies?: string;
    chronic_conditions?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
    created_at: string;
    updated_at: string;
}

export interface PatientListItem {
    id: number;
    national_id: string;
    full_name: string;
    age: number | null;
    gender: 'M' | 'F';
    phone_number?: string;
    created_at: string;
}

export interface CreatePatientRequest {
    national_id: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
    gender: 'M' | 'F';
    phone_number?: string;
    email?: string;
    address?: string;
    blood_type?: string;
    allergies?: string;
    chronic_conditions?: string;
    emergency_contact_name?: string;
    emergency_contact_phone?: string;
}

export const patientsAPI = {
    getAll: async (): Promise<PatientListItem[]> => {
        const response = await apiClient.get('/patients/');
        return response.data.results || response.data;
    },

    getRecent: async (): Promise<PatientListItem[]> => {
        const response = await apiClient.get('/patients/recent/');
        return response.data;
    },

    getById: async (id: number): Promise<Patient> => {
        const response = await apiClient.get(`/patients/${id}/`);
        return response.data;
    },

    create: async (data: CreatePatientRequest): Promise<Patient> => {
        const response = await apiClient.post('/patients/', data);
        return response.data;
    },

    update: async (id: number, data: Partial<CreatePatientRequest>): Promise<Patient> => {
        const response = await apiClient.patch(`/patients/${id}/`, data);
        return response.data;
    },

    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/patients/${id}/`);
    },

    search: async (query: string): Promise<PatientListItem[]> => {
        const response = await apiClient.get('/patients/', {
            params: { search: query },
        });
        return response.data.results || response.data;
    },
};
