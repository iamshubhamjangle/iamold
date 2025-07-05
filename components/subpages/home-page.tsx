"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import AddMemberDialog from "./add-member-dialog";
import Footer from "./footer";
import Header from "./header";
import MemberCard, { EmptyState } from "./member-card";

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

const HomePage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [newMember, setNewMember] = useState<{
    name: string;
    birthdate: string;
  }>({ name: "", birthdate: "" });
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Load members from localStorage on component mount
  useEffect(() => {
    const savedMembers = localStorage.getItem("iamold-members");
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    }
  }, []);

  // Save members to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem("iamold-members", JSON.stringify(members));
  }, [members]);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calculate age in years, months, days, hours, minutes, seconds
  const calculateAge = (birthdate: string): Age => {
    const birth = new Date(birthdate);
    const now = currentTime;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    let hours = now.getHours() - birth.getHours();
    let minutes = now.getMinutes() - birth.getMinutes();
    let seconds = now.getSeconds() - birth.getSeconds();

    // Adjust for negative values
    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }
    if (minutes < 0) {
      minutes += 60;
      hours--;
    }
    if (hours < 0) {
      hours += 24;
      days--;
    }
    if (days < 0) {
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  // Format date input (DD/MM/YYYY)
  const formatDateInput = (value: string): string => {
    const numericValue = value.replace(/\D/g, "");
    let formattedValue = "";

    if (numericValue.length >= 1) {
      formattedValue += numericValue.slice(0, 2);
    }
    if (numericValue.length >= 3) {
      formattedValue += "/" + numericValue.slice(2, 4);
    }
    if (numericValue.length >= 5) {
      formattedValue += "/" + numericValue.slice(4, 8);
    }

    return formattedValue;
  };

  // Convert DD/MM/YYYY to YYYY-MM-DD for Date object
  const parseDateInput = (dateString: string): string => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  // Handle adding new member
  const handleAddMember = (): void => {
    if (newMember.name.trim() && newMember.birthdate.length === 10) {
      const formattedDate = parseDateInput(newMember.birthdate);
      const newMemberData = {
        id: Date.now(),
        name: newMember.name.trim(),
        birthdate: formattedDate,
        originalInput: newMember.birthdate,
      };

      setMembers([...members, newMemberData]);
      setNewMember({ name: "", birthdate: "" });
      setShowAddDialog(false);
    }
  };

  // Handle date input change
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatDateInput(e.target.value);
    if (formatted.length <= 10) {
      setNewMember({ ...newMember, birthdate: formatted });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header onAdd={() => setShowAddDialog(true)} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        {members.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="space-y-4">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  calculateAge={calculateAge}
                />
              ))}
            </div>
            <span className="block text-center p-4 text-gray-500 text-sm">
              Tap on card for more options
            </span>
          </>
        )}
      </div>

      <Footer />

      {/* Add Member Dialog */}
      {showAddDialog && (
        <AddMemberDialog
          newMember={newMember}
          setNewMember={setNewMember}
          onCancel={() => {
            setShowAddDialog(false);
            setNewMember({ name: "", birthdate: "" });
          }}
          onAdd={handleAddMember}
          handleDateChange={handleDateChange}
        />
      )}
    </div>
  );
};

export default HomePage;
