import React, { useRef } from "react";
import { User, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Member = {
  id: number;
  name: string;
  birthdate: string;
  originalInput: string;
};

type Age = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type MemberCardProps = {
  member: Member;
  calculateAge: (birthdate: string) => Age;
  onDelete: () => void;
};

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  calculateAge,
  onDelete,
}) => {
  const age = calculateAge(member.birthdate);
  const birthDate = new Date(member.birthdate);

  // For accessibility: focus the trigger on click/tap
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          ref={triggerRef}
          className="w-full text-left bg-white/80 backdrop-blur-sm rounded-md p-5 space-y-3 shadow-xs border hover:shadow-xl transition-all duration-300 hover:border-blue-300 focus:outline-none"
          tabIndex={0}
          aria-label={`Options for ${member.name}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
            </div>
            <p className="text-gray-600 mt-1">
              <Tooltip>
                <TooltipTrigger>
                  {birthDate.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Date of birth</p>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
          <div className="inline-block font-mono text-3xl font-bold">
            <span className="text-blue-800">
              {age.years}Y {age.months}M {age.days}D{" "}
            </span>
            <span className="text-gray-500">
              {age.hours.toString().padStart(2, "0")}:
              {age.minutes.toString().padStart(2, "0")}:
              {age.seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={onDelete}
          variant="destructive"
          className="text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemberCard;

const EmptyState: React.FC = () => (
  <div className="text-center py-20">
    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <User className="w-12 h-12 text-blue-500" />
    </div>
    <h2 className="text-2xl font-bold text-gray-800 mb-2">
      No members added yet
    </h2>
    <p className="text-gray-600 mb-8">
      Click the ADD button to add your first member and start tracking ages!
    </p>
  </div>
);

export { EmptyState };
