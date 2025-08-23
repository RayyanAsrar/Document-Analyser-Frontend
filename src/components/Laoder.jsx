import { LucideLoader } from "lucide-react"

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <LucideLoader className="animate-spin text-secondary" />
    </div>
  )
}

export default Loader