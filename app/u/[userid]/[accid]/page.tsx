import Invoice from "@/components/ui/Invoice/Invoice";
import { supabaseAdmin } from "@/utils/supabase/admin";

export default async function Page({ params }: { params: { userid: string, accid: string } }) {

    const supabase = supabaseAdmin;

    const { data: existingKey } = await supabase.from('stripekeys').select('*').eq('user_id', params.userid).eq('id', params.accid).single();

    if(!existingKey){
        return (
            <div>Account not found</div>
        )
    }

    return (
        <Invoice stripekey={existingKey.key} userid={params.userid} accid={params.accid}/>
    )
}