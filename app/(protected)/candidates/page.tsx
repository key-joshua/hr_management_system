import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { FileText } from "lucide-react";
import Link from "next/link";

const candidates = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "(123) 456-7890",
    coverLetter: "Cover_Letter_Alice.pdf",
    resume: "Resume_Alice.pdf",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "(987) 654-3210",
    coverLetter: "Cover_Letter_Bob.pdf",
    resume: "Resume_Bob.pdf",
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    phone: "(555) 555-1234",
    coverLetter: "Cover_Letter_Charlie.pdf",
    resume: "Resume_Charlie.pdf",
  },
];

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <Navbar />
      <div className="min-h-screen bg-[#e5edf9] animate-fade-up animation-fill-forwards w-full">
        <div className="ml-24 mt-20 mr-4 mb-4 pt-6 px-2">
          <h2 className="text-2xl font-bold text-primary-active mb-6">Candidate List</h2>
          <div className="pt-4 w-full overflow-x-auto bg-[#f3f8ff]">
            <table className="min-w-[1100px] w-full">
              <thead>
                <tr>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Candidate</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Phone</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Cover Letter</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Resume</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500 text-sm">Details</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate.id} className="border-t">
                    <td className="text-center p-4">
                      <div className="flex items-center gap-2">
                        <img src="/admin-avatar.png" alt="User Avatar" className="h-8 w-8 rounded-full object-cover" />
                        <div className="text-left">
                          <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-500 text-sm">{candidate.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4 text-gray-600">{candidate.phone}</td>
                    <td className="text-center py-3 px-4">
                      <div className="w-fit m-auto border border-gray-200 rounded-lg p-3 pr-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 sm:h-8 sm:w-8 text-red-500 flex-shrink-0" />
                          <p className="w-[120px] text-sm text-gray-600 truncate">{candidate.resume}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="w-fit m-auto border border-gray-200 rounded-lg p-3 pr-4 hover:bg-gray-50 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 sm:h-8 sm:w-8 text-red-500 flex-shrink-0" />
                          <p className="w-[120px] text-sm text-gray-600 truncate">{candidate.coverLetter}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Link
                        href={`/candidates/${candidate.id}`}
                        className="h-10 px-5 py-3 rounded-md text-sm bg-primary-semi-active hover:bg-primary-mini-active"
                        style={{ color: "#fff" }}
                      >
                        View More
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
