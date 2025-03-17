'use server';
import mockDoctorInfo from '@/components/mockDoctorInfo';

const fetchDoctorName = async (doctorID : number) => {
    'use server'
    const doctorInfo = mockDoctorInfo.filter( doctor => doctor.id === doctorID) ;
    const doctorName = doctorInfo[0].name;
    return doctorName;
};

export default fetchDoctorName;