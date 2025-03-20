"use server";
import prisma from '@/lib/prisma';
import toast, { Toaster } from 'react-hot-toast';


const confirmAppointmentAction = async ( prevState: string, formData: FormData ) => {

    const id = Number(formData.get('appointmentID'));

    const appointment = await prisma.appointment.update({
        where : {
            appointmentID : id
        },
        data : {
            status : "Confirmed by Doctor"
        }
    })

    if (appointment) {
        console.log("Appointment confirmed successfully!");
        return ('Appointment confirmed successfully!');
        
    }
    else {
        console.log("Appointment failed to confirm!");
        return ('Appointment failed to confirm!');
    }

    return ""
}

export default confirmAppointmentAction
                        