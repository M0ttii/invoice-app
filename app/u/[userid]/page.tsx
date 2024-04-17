import GetInvoiceComponent from "@/components/ui/Invoice/GetInvoice";
import Invoice from "@/components/ui/Invoice/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/server";
import { usePathname } from "next/navigation";

export default async function InvoicePage({ params }: { params: { userid: string } }) {

    const supabase = supabaseAdmin;

    const { data: existingKey } = await supabase.from('stripekeys').select('*').eq('user_id', params.userid).single();

    if(!existingKey){
        return (
            <div>Account not found</div>
        )
    }

    return(
        <Invoice stripekey={existingKey.key} userid={params.userid}/>
    );

}