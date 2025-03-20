"use server";
import prisma from '@/lib/prisma';
import toast, { Toaster } from 'react-hot-toast';


const cancelAppointmentAction = async ( prevState: string, formData: FormData ) => {

    const id = Number(formData.get('appointmentID'));

    const appointment = await prisma.appointment.update({
        where : {
            appointmentID : id
        },
        data : {
            status : "Cancelled"
        }
    })

    if (appointment) {
        console.log('Appointment cancelled successfully!');
        return ('Appointment cancelled successfully!');
        
    }
    else {
        console.log('Appointment failed to cancel!');
        return ('Appointment failed to cancel!');
    }

    return ""
}

export default cancelAppointmentAction
                        