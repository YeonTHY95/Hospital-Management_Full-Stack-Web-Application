'use server';
import mockDoctorInfo from '@/components/mockDoctorInfo';
import prisma from '@/lib/prisma';

const fetchDoctorName = async (doctorID : number) => {
    'use server'
    const doctorInfo = await prisma.doctorinfo.findFirst( {
        where : {
            id : doctorID
        },
        select : {
            name : true
        }
    });  //mockDoctorInfo.filter( doctor => doctor.id === doctorID) ;
    const doctorName = doctorInfo && doctorInfo.name;
    return doctorName;
};

export default fetchDoctorName;