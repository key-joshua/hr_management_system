"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface NewCandidateProps {
  handleModal: (action: boolean) => void;
}
export const NewCandidate: React.FC<NewCandidateProps> = ({ handleModal }) => {
  return (
    <div className="py-4 px-3 h-fit rounded-lg shadow-sm bg-[#f3f8ff] w-[calc(100% - 48px)] sm:w-[500px]">
      <div className="flex items-center justify-between px-2 py-4">
        <h2 className="text-2xl font-bold text-primary-semi-active w-fit">New Candidate</h2>
        <button
          onClick={() => handleModal(false)}
          className="w-9 h-9 rounded flex items-center justify-center text-center hover:bg-[#e5edf9]"
        >
          <X className="text-primary-active text-xs" />
        </button>
      </div>
      <form className="space-y-5 max-h-[400px] overflow-y-auto px-3 mb-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-semibold text-primary-active">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter full name..."
            required
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-semibold text-primary-active">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email..."
            required
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-semibold text-primary-active">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter phone number..."
            required
            className="w-full h-12 px-4 rounded-md bg-transparent text-base text-primary-active placeholder:text-primary-semi-active border border-primary-semi-active focus:outline-none focus:border-primary-semi-active focus:ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 "
          />
        </div>

        <div className="space-y-4 pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-primaryBlue font-semibold rounded-lg text-white-active bg-primary-semi-active hover:text-white-active hover:bg-primary-mini-active transition-colors"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
