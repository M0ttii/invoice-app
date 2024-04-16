import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className }) => {
  return <button className={`justify-center items-center px-16 py-5 font-medium text-center rounded-xl max-md:px-5 max-md:max-w-full ${className}`}>{children}</button>;
};

const Divider: React.FC = () => {
  return (
    <div className="flex gap-3 items-center mt-7 whitespace-nowrap text-neutral-400 max-md:flex-wrap">
      <div className="shrink-0 self-stretch my-auto h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10 w-[205px]" />
      <div className="self-stretch">or</div>
      <div className="shrink-0 self-stretch my-auto h-px border border-solid bg-white bg-opacity-10 border-white border-opacity-10 w-[205px]" />
    </div>
  );
};

export default function MyComponent(){
  return (
    <div className="flex justify-center items-center px-16 py-20 text-xl bg-gray-900 max-md:px-5">
      <div className="flex flex-col mt-20 max-w-full w-[456px] max-md:mt-10">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a55035014a54cca2ca10df1c18bb830df5e09b5bc5636a42a4117da631406e17?apiKey=5fec0539efe04b8496ac963d1df679de&" alt="Waivy logo" className="self-center shadow-sm aspect-[1.04] w-[83px]" />
        <h1 className="self-center mt-12 text-5xl font-bold text-center text-white max-md:mt-10 max-md:text-4xl">Waivy</h1>
        <p className="mt-5 text-center text-white text-opacity-50 max-md:max-w-full">Submit your e-mail to retrieve your invoices.</p>
        <form>
          <label htmlFor="email" className="mt-24 text-neutral-400 max-md:mt-10 max-md:max-w-full">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="shrink-0 mt-4 rounded-xl border border-solid bg-slate-800 bg-opacity-20 border-white border-opacity-10 h-[63px] max-md:max-w-full"
            placeholder="Enter your email"
          />
          <Button className="mt-5 bg-indigo-700 text-white text-opacity-80">Retrieve my invoices</Button>
        </form>
        <Divider />
        <Button className="mt-6 text-indigo-500 bg-slate-800 bg-opacity-40">
          Return to <span className="text-indigo-500">waivy.com</span>
        </Button>
        <p className="self-center mt-11 text-base font-light text-center text-slate-400 max-md:mt-10">
          This service is provided by <span className="font-bold">InvoiceHub</span> and is not affiliated with{" "}
          <span className="font-bold">waivy.com</span>.
        </p>
      </div>
    </div>
  );
};