import React from 'react';
import { Calendar, MapPin, FileText } from 'lucide-react';

interface Patient {
    name: string;
    id: string;
    dob: string;
    gender: 'Male' | 'Female';
    address: string;
    lastVisit: string;
}

const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow transition-all hover:shadow-lg">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                        {patient.name.charAt(0)}
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-semibold leading-none tracking-tight">{patient.name}</h3>
                        <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
                    </div>
                    <div className="ml-auto rtl:mr-auto rtl:ml-0 font-medium text-xs bg-secondary px-2 py-1 rounded-full">
                        {patient.gender}
                    </div>
                </div>

                <div className="mt-4 grid gap-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {patient.dob}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        {patient.address}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
                        Last Visit: {patient.lastVisit}
                    </div>
                </div>
            </div>
            <div className="flex items-center p-6 pt-0">
                <button className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    View Record
                </button>
            </div>
        </div>
    );
};

export default PatientCard;
