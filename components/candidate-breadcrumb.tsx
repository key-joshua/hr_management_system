import Link from "next/link"
import { ArrowLeft, ChevronRight } from "lucide-react"

export function CandidateBreadcrumb() {
  return (
    <div className="pt-6 px-6 rounded-lg">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center text-sm">
            <Link href="/candidates" className="text-gray-500 hover:text-gray-900"> Candidates </Link>
            <ChevronRight className="h-4 w-4 text-primary-active" />
            <span className="font-medium text-primary-active">John Doe</span>
        </div>

        <Link href="/candidates" className="flex items-center text-sm font-medium text-primary-active">
          <ArrowLeft className="h-4 w-4 mr-1" /> Go Back
        </Link>
      </div>
    </div>
  )
}
