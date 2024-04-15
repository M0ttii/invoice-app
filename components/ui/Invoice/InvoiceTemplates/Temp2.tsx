import * as React from "react";

interface InvoiceItemProps {
  description: string;
  quantity: number;
  price: number;
  gst: number;
  amount: number;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({
  description,
  quantity,
  price,
  gst,
  amount,
}) => (
  <>
    <div className="flex gap-5 justify-between mt-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
      <div>{description}</div>
      <div className="flex gap-5 justify-between self-start text-center whitespace-nowrap">
        <div>{quantity}</div>
        <div>{price.toFixed(2)}</div>
        <div>{gst.toFixed(2)}</div>
        <div>{amount.toFixed(2)}</div>
      </div>
    </div>
    <img
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf893eacc41b1aba17317a37e4bc5c93ee9c4c49c62ebb4d8c03546030e381c4?apiKey=5fec0539efe04b8496ac963d1df679de&"
      alt=""
      className="mt-4 w-full border border-solid border-zinc-200 stroke-[1px] stroke-zinc-200 max-md:max-w-full"
    />
  </>
);

const invoiceItems: InvoiceItemProps[] = [
  {
    description: "Brand Design",
    quantity: 1,
    price: 2000.0,
    gst: 0.0,
    amount: 2000.0,
  },
  {
    description: "Website design",
    quantity: 1,
    price: 2000.0,
    gst: 0.0,
    amount: 2000.0,
  },
  {
    description: "Website development",
    quantity: 1,
    price: 2000.0,
    gst: 0.0,
    amount: 2000.0,
  },
];

export default function InvoiceTemplate2Preview() {
  return (
    <div className="flex flex-col pt-12 bg-white max-md:max-w-full aspect-[1.4142/1] origin-top-left scale-[0.47] subpixel-antialiased w-[210mm] h-[297mm]">
      <header className="flex flex-col px-6 w-full leading-[100%] text-sky-950 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between items-start px-px max-md:flex-wrap max-md:max-w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/072a1081726cb5e11ab1f1c2f0c7dd779a35861fbd951b432a158b4b5b7f3d51?apiKey=5fec0539efe04b8496ac963d1df679de&"
            alt="Company Logo"
            className="shrink-0 aspect-[1.45] w-[71px]"
          />
          <div className="flex flex-col mt-1">
            <div className="flex flex-col items-end pl-14 font-bold text-right max-md:pl-5">
              <h1 className="text-xl">INVOICE</h1>
              <div className="self-start mt-7 text-sm">
                BLOCKS DESIGN STUDIO
              </div>
              <div className="mt-2.5 text-xs">REG: 123000123000</div>
            </div>
            <address className="flex flex-col pl-5 mt-2 text-right">
              <div className="text-xs">
                hi@blocksdesign.co | +64 123 1234 123
              </div>
              <div className="self-end mt-9 text-sm font-bold">ACME CO.</div>
            </address>
            <div className="flex gap-5 justify-between mt-3 text-xs">
              <div>
                INVOICE NUMBER:
                <br />
                INVOICE DATE:
                <br />
                DUE:
              </div>
              <div className="text-right">
                INV-0002
                <br />
                02 Jan 2023
                <br />
                20 Jan 2023
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="flex flex-col py-4 mt-11 text-xs rounded border border-solid border-zinc-200 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 justify-between w-full font-bold whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div>Description</div>
          <div className="flex gap-5 justify-between">
            <div>Qty</div>
            <div>Price</div>
            <div>GST</div>
            <div>Amount</div>
          </div>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf893eacc41b1aba17317a37e4bc5c93ee9c4c49c62ebb4d8c03546030e381c4?apiKey=5fec0539efe04b8496ac963d1df679de&"
          alt=""
          className="mt-3 w-full border border-solid border-zinc-200 stroke-[1px] stroke-zinc-200 max-md:max-w-full"
        />
        {invoiceItems.map((item, index) => (
          <InvoiceItem key={index} {...item} />
        ))}
      </section>
      <footer className="flex gap-5 justify-between self-end px-4 py-3.5 mt-5 text-xs bg-gray-50 rounded border border-solid border-zinc-200">
        <div className="flex flex-col">
          <div>Sub total (excl. GST)</div>
          <div className="mt-3.5">Total GST:</div>
          <div className="mt-4">Credit card fee (if using):</div>
          <div className="mt-7 font-bold">Amount due on 20 Jan 2023:</div>
        </div>
        <div className="flex flex-col text-right">
          <div>$6,000.00</div>
          <div className="flex flex-col items-start pl-11 mt-3.5 whitespace-nowrap max-md:pl-5">
            <div>$0.00</div>
            <div className="mt-3.5">$92.00</div>
          </div>
          <div className="mt-7 font-bold">6,000.00 NZD</div>
        </div>
      </footer>
      <section className="px-8 py-6 mt-12 w-full bg-gray-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[73%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xs leading-3 text-sky-950 max-md:mt-10">
              <h2 className="font-bold text-indigo-500 uppercase">
                PAYMENT INSTRUCTIONS
              </h2>
              <div className="mt-4">Blocks design studio</div>
              <div className="mt-2">Bank name: ABC Bank limited</div>
              <div className="mt-2">SWIFT/IBAN: NZ0201230012</div>
              <div className="mt-2">Account number: 12-1234-123456-12</div>
              <div className="mt-2 font-bold">
                Please use as INV-0002 as a reference number
              </div>
              <div className="mt-9">
                For any questions please contact us at hi@blocksdesign.co
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[27%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow mt-6 text-xs leading-3 text-sky-950 max-md:mt-10">
              <div>Pay online</div>
              <a
                href="https://buy.stripe.com/"
                className="mt-2 font-bold underline"
              >
                https://buy.stripe.com/
              </a>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b6d7b77369ff491731be2da15d3ba73c83cbd359e3b2bae92a7977bb169ce85d?apiKey=5fec0539efe04b8496ac963d1df679de&"
                alt="QR Code"
                className="mt-3.5 aspect-square w-[75px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}