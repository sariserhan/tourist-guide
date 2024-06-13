import { Loader } from "lucide-react"

const LoadingCOmponent = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader />
      <p className="mx-2">Loading...</p>
    </div>
  )
}

export default LoadingCOmponent
