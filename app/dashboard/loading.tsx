import { ClipLoader } from "react-spinners";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="bg-white">
        <ClipLoader className="animate-spin"/>
      </div>
    )
  }