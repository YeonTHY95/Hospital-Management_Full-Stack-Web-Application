import Image from "next/image";
import ImageSlider from "@/components/imageslider";
import FindDoctorForm from "@/components/finddoctorform";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-[2px]">
      <ImageSlider />
      
      <div className="flex justify-around relative w-[80%] z-[20]">
          <FindDoctorForm />
          <FindDoctorForm />
          <FindDoctorForm />
      </div>
      <div className="bg-orange-300 h-[300px] w-full relative z-[1] flex justify-center items-center">
        <p className="text-5xl">Information 1</p>
      </div>
      
    </div>
  );
}
