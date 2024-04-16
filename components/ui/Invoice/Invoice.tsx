'use client'
import { useState } from "react";
import GetInvoiceComponent from "./GetInvoice";
import InvoiceList from "./InvoiceList";
import Temp1 from "./InvoiceTemplates/Temp1";
import { z } from "zod";
import { Invoice } from "@/models/Invoice";
import { generateTokenMail, getInvoicesForCustomer } from "@/app/actions";
import { set } from "react-hook-form";
import InvoicePortal from "./InvoicePortal";
import { sendEmail, sendTokenMail } from "@/aws/email";

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
		if(temp.length === 0){
			console.log("No invoices found");
			setLoading(false);
			return;
		}
		generateTokenMail(email, userid);
		// sendTokenMail({to: email, tokenLink: "https://invoicehub.app"})
		setInvoices(temp || []);
		setLoading(false);
		setShowList(true);
	}

	return (
		<div className="w-full h-screen px-10 backdrop-blur-3xl  bg-[radial-gradient(50%_50%_at_50%_50%,_rgb(25,21,47)_0%,_rgb(11.07,_10.9,_13.04)_100%)] bg-[rgba(255,_255,_255,_1)]"> {/* Modified line */}
			{!showList ? (
				<GetInvoiceComponent userid={userid} setCustomerEmail={setCustomerEmail} loading={loading} setShowList={setShowList} oonSubmit={handleOnSubmit} />
			) : (
				<InvoicePortal invoices={invoices} ></InvoicePortal>
				//<Temp1></Temp1>
			)}
		</div>
	);
}