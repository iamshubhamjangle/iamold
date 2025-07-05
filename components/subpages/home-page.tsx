"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Plus, Calendar, User, CalendarHeart } from "lucide-react";

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
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <CalendarHeart className="w-6 h-6 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                iamold
              </h1>
            </div>
            <button
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-2 rounded-md font-semibold flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span>ADD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 min-h-screen">
        {members.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No members yet
            </h2>
            <p className="text-gray-600 mb-8">
              Click the ADD button to add your first member and start tracking
              ages!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {members.map((member) => {
              const age = calculateAge(member.birthdate);
              const birthDate = new Date(member.birthdate);

              return (
                <div
                  key={member.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {birthDate.toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </p>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg inline-block font-mono text-lg font-bold">
                        {age.years}Y {age.months}M {age.days}D{" "}
                        <span className="text-blue-100">
                          {age.hours.toString().padStart(2, "0")}:
                          {age.minutes.toString().padStart(2, "0")}:
                          {age.seconds.toString().padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-blue-500" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-blue-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <span>Free to use</span>
                <span>•</span>
                <span>No login required</span>
                <span>•</span>
                <span>Saved on your device</span>
                <span>•</span>
                <span>Open Source</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Made with ❤️ for tracking the precious moments of life
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">
                  Add New Member
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) =>
                      setNewMember({ ...newMember, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birthday
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newMember.birthdate}
                      onChange={handleDateChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-10"
                      placeholder="DD/MM/YYYY"
                      maxLength={10}
                    />
                    <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-8">
                <button
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewMember({ name: "", birthdate: "" });
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  disabled={
                    !newMember.name.trim() || newMember.birthdate.length !== 10
                  }
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
