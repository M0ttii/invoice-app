'use client'
import { useState } from "react";
import GetInvoiceComponent from "./GetInvoice";
import InvoiceList from "./InvoiceList";
import Temp1 from "./InvoiceTemplates/Temp1";
import { usePathname } from "next/navigation";
import { z } from "zod";
import { Invoice } from "@/models/Invoice";
import { getInvoicesForCustomer } from "@/app/actions";
import { set } from "react-hook-form";

interface InvoiceProps {
	userid: string;
}

export default function Invoice({ userid }: InvoiceProps) {
	const [loading, setLoading] = useState(false);
	const [showList, setShowList] = useState(false);
	const [customer_email, setCustomerEmail] = useState("");
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	async function handleOnSubmit(email: string) {
		setLoading(true);
		const temp = await getInvoicesForCustomer(userid, email);
		setInvoices(temp || []);
		setLoading(false);
		setShowList(true);
	}

	return (
		<div className="w-full h-[calc(100vh-4rem)] px-10 flex items-center justify-center"> {/* Modified line */}
			{!showList ? (
				<GetInvoiceComponent userid={userid} setCustomerEmail={setCustomerEmail} loading={loading} setShowList={setShowList} oonSubmit={handleOnSubmit} />
			) : (
				<InvoiceList invoices={invoices} ></InvoiceList>
				//<Temp1></Temp1>
			)}
		</div>
	);
}