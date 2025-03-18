import Image from "next/image";
import ImageSlider from "@/components/imageslider";
import FindDoctorForm from "@/components/finddoctorform";
import prisma from '@/lib/prisma';

export default async function Home() {

  const fetchDoctor:{ name: string, id : number}[] = await prisma.doctorinfo.findMany ( {
    select : {
      name : true,
      id: true
    }
  });

  return (
    <div className="flex flex-col justify-center items-center gap-[2px]">
      <ImageSlider />
      
      <div className="flex justify-around relative w-[80%] z-[20]">
          <FindDoctorForm fetchDoctorData={fetchDoctor}/>
          <FindDoctorForm fetchDoctorData={fetchDoctor}/>
          <FindDoctorForm fetchDoctorData={fetchDoctor}/>
      </div>
      <div className="bg-orange-300 h-[300px] w-full relative z-[1] flex justify-center items-center">
        <p className="text-5xl">Information 1</p>
      </div>
      
    </div>
  );
}
