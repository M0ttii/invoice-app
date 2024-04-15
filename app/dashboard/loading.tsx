import { ClipLoader } from "react-spinners";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="flex justify-center items-center dark:bg-muted/30 bg-white w-screen h-[calc(100vh-4rem)]">
        <ClipLoader color="#ffffff" className="animate-spin text-white"/>
      </div>
    )
  }