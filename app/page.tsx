import Image from "next/image";
import ImageSlider from "@/components/imageslider";
import FindDoctorForm from "@/components/finddoctorform";

export default function Home() {
  return (
    <div className="flex-col justify-center items-center">
      <ImageSlider />
      <div className="w-[30%]">
        <FindDoctorForm />
      </div>
      
    </div>
  );
}
