import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { CandidateProfile } from "@/components/candidate-profile"
import { CandidateBreadcrumb } from "@/components/candidate-breadcrumb"

export default function CandidatesPage() {
  return (
      <>
          <Sidebar />
          <Navbar />

          <div className="min-h-screen bg-[#e5edf9] animate-fade-up animation-fill-forwards">
              <main className="ml-20 pt-16 px-4 py-6 mx-auto">
                <div className="flex flex-col xl:flex-row gap-6 mt-6">
                  <div className="flex-1 min-w-0">
                    <CandidateBreadcrumb />
                    <CandidateProfile />
                  </div>
                </div>
              </main>
          </div>
      </>
    )
}
