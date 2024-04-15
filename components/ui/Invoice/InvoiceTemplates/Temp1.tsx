import { Invoice } from "@/models/Invoice";
import { cn } from "@/utils/cn";
import * as React from "react";

interface InvoiceItemProps {
  name: string;
  quantity: number;
  price: number;
  total: number;
}

const InvoiceItem: React.FC<InvoiceItemProps> = ({ name, quantity, price, total }) => (
  <div className="flex gap-5 justify-between mx-5 mt-8 text-xs text-gray-900 max-md:flex-wrap max-md:mr-2.5">
    <div>{name}</div>
    <div className="text-right text-gray-500">{quantity}</div>
    <div className="text-right text-gray-500">{price.toFixed(2)}</div>
    <div className="text-right">{total.toFixed(2)}</div>
  </div>
);

interface CompanyInfoProps {
  name: string;
  address: string;
  email: string;
  id1Label: string;
  id1Value: string;
  id2Label: string;
  id2Value: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  name,
  address,
  email,
  id1Label,
  id1Value,
  id2Label,
  id2Value,
}) => (
  <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col text-xs text-gray-900 max-md:mt-3">
      <div className="text-sm font-bold">{name}</div>
      <div className="mt-2">{address}</div>
      <div className="mt-2 text-indigo-700">{email}</div>
      <div className="mt-2 text-right text-gray-500">{id1Label}</div>
      <div>{id1Value}</div>
      <div className="mt-2 text-right text-gray-500">{id2Label}</div>
      <div>{id2Value}</div>
    </div>
  </div>
);

interface PaymentInstructionsProps {
  instructions: string;
  id1Label: string;
  id1Value: string;
  id2Label: string;
  id2Value: string;
}

const PaymentInstructions: React.FC<PaymentInstructionsProps> = ({
  instructions,
  id1Label,
  id1Value,
  id2Label,
  id2Value,
}) => (
  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col grow text-xs text-gray-900 max-md:mt-3">
      <div className="font-semibold">Payment Instructions</div>
      <div className="mt-2 text-gray-500">{instructions}</div>
      <div className="mt-2 text-right text-gray-500">{id1Label}</div>
      <div>{id1Value}</div>
      <div className="mt-2 text-right text-gray-500">{id2Label}</div>
      <div>{id2Value}</div>
    </div>
  </div>
);

interface AdditionalNotesProps {
  notes: string;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({ notes }) => (
  <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
    <div className="flex flex-col text-xs max-md:mt-3">
      <div className="font-semibold text-gray-900">Additional Notes</div>
      <div className="mt-2 text-gray-500">{notes}</div>
    </div>
  </div>
);

interface InvoiceTemplate1Props {
  invoice: Invoice | null;
  height: number;
  width: number;
}

export const InvoiceTemplate1 = ({ invoice, height, width }: InvoiceTemplate1Props) => {
  const invoiceItems = [
    {
      name: "Invoice Item 1",
      quantity: 1,
      price: 4000,
      total: 4000,
    },
  ];

  const companyInfo = {
    name: "Company Name LLC",
    address: "Address / Contact Info",
    email: "email@company.com",
    id1Label: "ID#1 Label",
    id1Value: "1234567890-123",
    id2Label: "ID#2 Label",
    id2Value: "ABC-0987654321",
  };

  const paymentInstructions = {
    instructions:
      "Voluptas nisi aut. Est vitae dolore molestias porro praesentium. Tempore recusandae voluptatem necessitatibus corporis inventore neque magnam ut.",
    id1Label: "ID#1 Label",
    id1Value: "1234567890-123",
    id2Label: "ID#2 Label",
    id2Value: "ABC-0987654321",
  };

  const additionalNotes = {
    notes: "Have a great day",
  };

  const invoiceTotal = invoiceItems.reduce((acc, item) => acc + item.total, 0);

  

  return (
    <div className={cn("flex flex-col pt-2.5 pb-20 bg-white rounded-3xl max-md:max-w-full", ` h-[${height}mm] w-[${width}mm]`)}>
      <div className="flex flex-col px-2.5 w-full max-md:max-w-full">
        <div className="flex gap-5 p-5 text-xs rounded-xl bg-slate-100 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 self-start mt-1 text-gray-900">
            <div className="text-xl font-bold">Invoice</div>
            <div className="mt-10 text-right text-gray-500">Billed To:</div>
            <div className="mt-2.5 text-sm font-semibold">{invoice?.customer_details.name}</div>
            <div className="mt-2">{invoice?.customer_details.adress.city}</div>
          </div>
          <div className="flex flex-col flex-1 justify-between items-end text-right text-gray-500">
            <div>Invoice No.</div>
            <div className="mt-1 text-sm font-bold text-gray-900">#000123</div>
            <div className="mt-10">Issued on</div>
            <div className="self-stretch text-gray-900">December 7, 2022.</div>
            <div className="mt-3">Payment Due</div>
            <div className="self-stretch text-gray-900">December 22, 2022.</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between mx-5 mt-11 whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          <div className="text-sm font-bold text-gray-900">Services</div>
          <div className="flex gap-5 justify-between self-start text-xs text-right text-gray-500">
            <div>Qty.</div>
            <div>Price</div>
            <div>Total</div>
          </div>
        </div>
        {invoice?.items.map((item, index) => (
          <div key={index} className="flex gap-5 justify-between mx-5 mt-8 text-xs text-gray-900 max-md:flex-wrap max-md:mr-2.5">
            <div>{typeof item.name === 'string' ? item.name : 'N/A'}</div>
            <div className="text-right text-gray-500">{Number.isFinite(item.quantity) ? item.quantity : 'N/A'}</div>
            <div className="text-right text-gray-500">{Number.isFinite(item.price) ? item.price : 'N/A'}</div>
            <div className="text-right">{Number.isFinite(item.total) ? item.total : 'N/A'}</div>
          </div>
        ))}

        <div className="flex gap-5 justify-between self-end px-5 py-3 mt-52 max-w-full text-right whitespace-nowrap rounded-xl bg-slate-100 w-[243px] max-md:mt-10">
          <div className="flex gap-1 my-auto text-xs text-gray-500">
            <div>Total</div>
            <div className="flex gap-px justify-center">
              <div>(</div>
              <div className="text-gray-900">USD</div>
              <div>)</div>
            </div>
          </div>
          <div className="text-base font-bold text-gray-900">4,000.00</div>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&"
        className="mt-10 ml-8 w-10 aspect-square max-md:ml-2.5"
      />
      <div className="self-center px-5 mt-3 w-full max-w-[575px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-xs text-gray-900 max-md:mt-3">
              <div className="text-sm font-bold">Company Name LLC</div>
              <div className="mt-2">Address / Contact Info</div>
              <div className="mt-2 text-indigo-700">email@company.com</div>
              <div className="mt-2 text-right text-gray-500">ID#1 Label</div>
              <div>1234567890-123</div>
              <div className="mt-2 text-right text-gray-500">ID#2 Label</div>
              <div>ABC-0987654321</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xs text-gray-900 max-md:mt-3">
              <div className="font-semibold">Payment Instructions</div>
              <div className="mt-2 text-gray-500">
                Voluptas nisi aut. Est vitae dolore molestias porro praesentium.
                Tempore recusandae voluptatem necessitatibus corporis inventore
                neque magnam ut.
              </div>
              <div className="mt-2 text-right text-gray-500">ID#1 Label</div>
              <div>1234567890-123</div>
              <div className="mt-2 text-right text-gray-500">ID#2 Label</div>
              <div>ABC-0987654321</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-xs max-md:mt-3">
              <div className="font-semibold text-gray-900">
                Additional Notes
              </div>
              <div className="mt-2 text-gray-500">Have a great day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export const InvoiceTemplate1Preview = () => {
  return (
    <div className={cn("aspect-[1.4142/1] origin-top-left scale-[0.47] subpixel-antialiased flex flex-col pt-2.5 pb-20 bg-white rounded-3xl max-md:max-w-full", " w-[210mm] h-[297mm]")}>
      <div className="flex flex-col px-2.5 w-full max-md:max-w-full">
        <div className="flex gap-5 p-5 text-xs rounded-xl bg-slate-100 max-md:flex-wrap max-md:max-w-full">
          <div className="flex flex-col flex-1 self-start mt-1 text-gray-900">
            <div className="text-xl font-bold">Invoice</div>
            <div className="mt-10 text-right text-gray-500">Billed To:</div>
            <div className="mt-2.5 text-sm font-semibold">Jon Doe</div>
            <div className="mt-2">Berlin</div>
          </div>
          <div className="flex flex-col flex-1 justify-between items-end text-right text-gray-500">
            <div>Invoice No.</div>
            <div className="mt-1 text-sm font-bold text-gray-900">#000123</div>
            <div className="mt-10">Issued on</div>
            <div className="self-stretch text-gray-900">December 7, 2022.</div>
            <div className="mt-3">Payment Due</div>
            <div className="self-stretch text-gray-900">December 22, 2022.</div>
          </div>
        </div>
        <div className="flex gap-5 justify-between mx-5 mt-11 whitespace-nowrap max-md:flex-wrap max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
          <div className="text-sm font-bold text-gray-900">Services</div>
          <div className="flex gap-5 justify-between self-start text-xs text-right text-gray-500">
            <div>Qty.</div>
            <div>Price</div>
            <div>Total</div>
          </div>
        </div>

          <div className="flex gap-5 justify-between mx-5 mt-8 text-xs text-gray-900 max-md:flex-wrap max-md:mr-2.5">
            <div>TestProduct</div>
            <div className="text-right text-gray-500">1</div>
            <div className="text-right text-gray-500">$12.49</div>
            <div className="text-right">$12.49</div>
          </div>


        <div className="flex gap-5 justify-between self-end px-5 py-3 mt-52 max-w-full text-right whitespace-nowrap rounded-xl bg-slate-100 w-[243px] max-md:mt-10">
          <div className="flex gap-1 my-auto text-xs text-gray-500">
            <div>Total</div>
            <div className="flex gap-px justify-center">
              <div>(</div>
              <div className="text-gray-900">USD</div>
              <div>)</div>
            </div>
          </div>
          <div className="text-base font-bold text-gray-900">4,000.00</div>
        </div>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/eadd9d57100e2556c50882ecb2466d7974a9f7ad864e00660e1bf2b52bff6b25?apiKey=5fec0539efe04b8496ac963d1df679de&"
        className="mt-10 ml-8 w-10 aspect-square max-md:ml-2.5"
      />
      <div className="self-center px-5 mt-3 w-full max-w-[575px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-xs text-gray-900 max-md:mt-3">
              <div className="text-sm font-bold">Company Name LLC</div>
              <div className="mt-2">Address / Contact Info</div>
              <div className="mt-2 text-indigo-700">email@company.com</div>
              <div className="mt-2 text-right text-gray-500">ID#1 Label</div>
              <div>1234567890-123</div>
              <div className="mt-2 text-right text-gray-500">ID#2 Label</div>
              <div>ABC-0987654321</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-xs text-gray-900 max-md:mt-3">
              <div className="font-semibold">Payment Instructions</div>
              <div className="mt-2 text-gray-500">
                Voluptas nisi aut. Est vitae dolore molestias porro praesentium.
                Tempore recusandae voluptatem necessitatibus corporis inventore
                neque magnam ut.
              </div>
              <div className="mt-2 text-right text-gray-500">ID#1 Label</div>
              <div>1234567890-123</div>
              <div className="mt-2 text-right text-gray-500">ID#2 Label</div>
              <div>ABC-0987654321</div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-xs max-md:mt-3">
              <div className="font-semibold text-gray-900">
                Additional Notes
              </div>
              <div className="mt-2 text-gray-500">Have a great day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
