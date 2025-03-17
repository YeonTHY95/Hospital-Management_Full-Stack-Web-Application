

const makeAppointmentAction = async ( prevState: string | null, formData : FormData): Promise<string> => {
  
    const doctorName = formData.get("doctorName");
    const patientName = formData.get("patientName");
    const contactNumber = formData.get("contactNumber");
    const appointmentDate = formData.get("appointmentDate");
    const symptom = formData.get("symptom");
  
  
    return "";
}

export default makeAppointmentAction