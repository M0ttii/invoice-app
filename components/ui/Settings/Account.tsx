import { Edit, Trash } from "lucide-react";
import { Button } from "../button";
import { Label } from "../label";

interface AccountProps {
    name: string | null | undefined;
}

export const Account = (props: AccountProps) => {
    return (
        <div className="flex justify-between w-1/2 h-10 dark:bg-[#18181B] border rounded-md">
            <div className="flex justify-start items-center pl-2 space-x-2">
                <div className="rounded-xl h-7 w-7 bg-green-300"></div>
                <Label>{props.name}</Label>
            </div>
            <div className="flex justify-end items-center pr-2">
                <Button className="dark" variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                </Button>
                <Button className="dark" variant="ghost" size="icon">
                    <Trash className="h-4 w-4 text-red-500" />
                </Button>
            </div>
        </div>
    )
}