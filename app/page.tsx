import Image from "next/image";
import ImageSlider from "@/components/imageslider";
import FindDoctorForm from "@/components/finddoctorform";
import SpecialityForm from "@/components/specialityForm";
import prisma from '@/lib/prisma';

export default async function Home() {

  const fetchDoctor:{ name: string, id : number}[] = await prisma.doctorinfo.findMany ( {
    select : {
      name : true,
      id: true
    }
  });
  const fetchSpeciality:{ speciality : string}[] = await prisma.doctorinfo.findMany ( {
    select : {
      speciality : true,
    }
  });

  const specialityArray = fetchSpeciality.map( s => s.speciality);
  const specialityUniqueArray = [...new Set(specialityArray)];

  return (
    <div className="relative flex flex-col justify-center items-center gap-2 z-1">
      <ImageSlider />
      
      <div className="flex justify-center relative w-[80%] z-[20] gap-5 items-center">
          <FindDoctorForm fetchDoctorData={fetchDoctor}/>
          <SpecialityForm specialityArray={specialityUniqueArray} />
          
      </div>
      <div className=" h-[600px] w-full relative z-[1] flex justify-center items-center">
        <div className="backgroundimage">
          <div className="flex self-start items-start "> 
            <p className="text-7xl text-white font-black mt-[30px] ml-[20px]">Our Vision</p>
          </div>
          <div className="flex justify-start items-center w-[500px]">
            <p className="text-2xl text-white font-bold text-justify mr-[100px]">“To be a leading healthcare institution committed to providing exceptional, patient-centered care through innovation, compassion, and excellence. We strive to enhance lives by delivering world-class medical services, embracing cutting-edge technology, and fostering a healing environment where every patient receives personalized attention. Our goal is to set new standards in healthcare, ensuring accessibility, affordability, and holistic well-being for our community.”</p>

          </div>
        </div>
      </div>
      
    </div>
  );
}
