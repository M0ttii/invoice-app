import { ClipLoader } from "react-spinners";

export default function Loading(){
    return (
        <div className="flex justify-center items-center w-full">
            <ClipLoader color="#ffffff" className="animate-spin text-white"/>
        </div>
    )
}