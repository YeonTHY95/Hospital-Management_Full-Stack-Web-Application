"use server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const updateAppointmentAction = async ( prevState: string, formData : FormData): Promise<string> => {
    
    const doctorName = formData.get("doctorName");
    const patientName = formData.get("patientName");
    const contactNumber = formData.get("contactNumber");
    const appointmentDate = formData.get("appointmentDate");
    const symptom = formData.get("symptom");
    const id = Number(formData.get("id"));

    console.log(`appointmentDate is ${formData.get("appointmentDate")}`);
    console.log(`appointmentDate is ${appointmentDate}`);

    const appointmentZodSchema = z.object ( {
        doctorName : z.string({required_error:"doctor is needed to select"}),
        patientName : z.string({required_error:"Name is needed to provide"}),
        contactNumber : z.string().min(1,{message:"Contact Number is needed"}).max(15,{message:"Incorrect Number Format"}),
        appointmentDate : z.string().date(),
        symptom : z.string({required_error:"Please provide symptom"}),
        id : z.number()
    });

    const validationResult = await appointmentZodSchema.safeParseAsync({
        doctorName,patientName, contactNumber,appointmentDate, symptom,id
    });

    if (validationResult.success) {
        console.log("ValidationResult is successful");
        const {doctorName,patientName, contactNumber,appointmentDate, symptom,id} = validationResult.data;
        const doctorWithID = await prisma.doctorinfo.findFirst({
            where : {
                name : doctorName
            },
            include : {
                doctor: {
                    select : {
                        id: true
                    }
                }
            }
        });
        const patientWithID = await prisma.user.findFirst ( {
            where : {
                username: patientName
            },
            select :{
                id: true
            }
        });

        const bothIDValidationSchema = z.object({
            doctorID : z.string(),
            patientID : z.string()
        });

        const bothIDValidation = await bothIDValidationSchema.safeParseAsync({doctorID: doctorWithID?.doctor?.id, patientID :patientWithID?.id })

        if (bothIDValidation.success) {
            const { doctorID, patientID } = bothIDValidation.data;

            console.log(`appointmentDate is ${appointmentDate}, type is ${typeof appointmentDate}`)

            const updateAppointment = await prisma.appointment.update({
                where :{
                    appointmentID : id
                },
                data: {
                    doctorName,
                    patientName,
                    contactNumber,
                    appointmentDate: new Date(appointmentDate), 
                    symptom,
                    doctorID, // (doctorWithID && doctorWithID.doctor?.id ) ??
                    patientID, //(patientWithID && patientWithID.id) ??
                    status : "Pending Doctor's Confirmation"
                }
            });

            if (updateAppointment){
                console.log("Appointment updated successfully");
                return "Appointment updated successfully" ;
            }
            else {
                console.log("Failed to update Appointment");
                return "Failed to update Appointment";
            }
        }
        else {
            console.log("Invalid both Patient and Doctor ID");
            return "Invalid both Patient and Doctor ID";
        }
        

    }

    else {
        console.log("Validation Fails");
        console.log(validationResult.error.message);
        return validationResult.error.flatten().formErrors[0];
    }
  
  
    return "";
}

export default updateAppointmentAction