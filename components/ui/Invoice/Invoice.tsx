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
import { motion } from "framer-motion";
import Image from "next/image";
import { Label } from "../label";
import { cn } from "@/utils/cn";
import { Public_Sans } from "next/font/google";
import NameAndPictureWrapper from "./NameAndPictureWrapper";
import NameAndPicture from "./NameAndPicture";

interface InvoiceProps {
	userid: string;
	accid?: string;
	stripekey?: string | null;
}



export default function Invoice(props : InvoiceProps) {
	console.log("KEY: " + props.stripekey)

	return (
		<div className="w-full h-screen px-10 backdrop-blur-3xl  bg-[radial-gradient(50%_50%_at_50%_50%,_rgb(25,21,47)_0%,_rgb(11.07,_10.9,_13.04)_100%)] bg-[rgba(255,_255,_255,_1)]"> {/* Modified line */}
			<div className="flex flex-col h-screen items-center justify-center transform -translate-y-10 px-0">
				<NameAndPictureWrapper>
					<NameAndPicture userid={props.userid} stripekey={props.stripekey}/>
				</NameAndPictureWrapper>
				<GetInvoiceComponent userid={props.userid} />
			</div>
		</div>
			);
}
