"use server"
import prisma from '@/lib/prisma';

export default async function completeAppointmentAction(prevState : string, formData: FormData ) {

    const appointmentID = Number(formData.get('appointmentID'));
    const details = formData.get('detail');

    const appointment = await prisma.appointment.update({
        where : {
            appointmentID
        },
        data : {
            status : "Completed",
            details : details as string
        }
    })
    
    if (appointment) {
        console.log("Appointment completed successfully!");
        return ('Appointment completed successfully!');
        
    }
    else {
        console.log("Appointment failed to completed!");
        return ('Appointment failed to completed!');
    }

}
