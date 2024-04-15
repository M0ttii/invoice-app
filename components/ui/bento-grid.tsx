import { cn } from "@/utils/cn";
import { RadioGroupItem } from "./radio-group";


export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] w-full grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  content,
  radioValue,
  radioId,
}: {
  className?: string;
  title?: string | React.ReactNode;
  content: React.ReactNode;
  radioValue: string;
  radioId: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl hover:cursor-pointer group/bento  hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] dark:hover:border-purple-600  bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >

        {content}
      <div className="group-hover/bento:translate-x-2 transition duration-200">

      </div>
    </div>
  );
};
