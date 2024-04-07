'use client'
import { useState } from "react";
import GetInvoiceComponent from "./GetInvoice";
import InvoiceList from "./InvoiceList";
import Temp1 from "./InvoiceTemplates/Temp1";

interface InvoiceProps {
	userid: string;
}

export default function Invoice({ userid }: InvoiceProps) {
	const [showList, setShowList] = useState(false);
	return (
		<div className="w-full h-[calc(100vh-4rem)] px-10 flex items-center justify-center"> {/* Modified line */}
			{!showList ? (
				<GetInvoiceComponent userid={userid} setShowList={setShowList} />
			) : (
				// <InvoiceList sessions={null}></InvoiceList>
				<Temp1></Temp1>
			)}
		</div>
	);
}