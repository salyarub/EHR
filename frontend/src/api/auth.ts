import apiClient from './client';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    password2: string;
    first_name: string;
    last_name: string;
    role: string;
    phone_number?: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
        phone_number?: string;
    };
}

export const authAPI = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const response = await apiClient.post('/auth/login/', data);
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await apiClient.post('/auth/register/', data);
        return response.data;
    },

    logout: async (refreshToken: string) => {
        const response = await apiClient.post('/auth/logout/', {
            refresh: refreshToken,
        });
        return response.data;
    },

    getProfile: async () => {
        const response = await apiClient.get('/auth/profile/');
        return response.data;
    },
};
