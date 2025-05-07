"use client"

import { useUser } from "@/store";
import { Statistics } from "./statistics";
import { WorkField } from "./workfield";
import { Schedules } from "./schedule";

export default function Home() {
  const {studentType, profileId, userId} = useUser((state) => state)

  return (
      <div className="flex flex-col-reverse md:grid md:grid-cols-5 gap-4 mt-4 h-full">
        <div className="col-span-2 hidden md:block">
          <Statistics studentType={studentType} />
        </div>
        <div className="col-span-3 bg-[#F0EFF4] rounded-3xl flex flex-col lg:grid lg:grid-cols-2 p-6 gap-4 h-full">
          <div className="col-span-1">
            <WorkField studentType={studentType} profileId={profileId} userId={userId} />
          </div>
          <div className="hidden md:block md:col-span-1">
            <Schedules studentType={studentType} />
          </div>
        </div>
      </div>
  );
}
