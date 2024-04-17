import Image from "next/image";
import { Label } from "../label";
import { cn } from "@/utils/cn";
import { Public_Sans } from "next/font/google";
import Stripe from "stripe";
import { supabaseAdmin } from "@/utils/supabase/admin";

const publicSans = Public_Sans({
    display: "swap",
})

interface NameAndPictureProps {
    userid: string,
    accid?: string,
    stripekey?: string | null
}

const NameAndPicture = async (props: NameAndPictureProps) => {
    if (!props.stripekey) return null;
    const supabase = supabaseAdmin;

    const stripe = new Stripe(props.stripekey || '', {
        apiVersion: '2023-10-16',
    });

    var account = await stripe.accounts.retrieve();

    async function getPicture() {
        if (account.settings?.branding.icon) {
            try {
                const file = await stripe.files.retrieve(account.settings?.branding.icon?.toString());
                if (!file || file === null || file === undefined || file.url === null) throw new Error("File not found");
                return file.url;
            } catch (err) {
                const { data, error } = await supabase.from('users').select('picture_url').eq('id', props.userid).single();
                if (error || !data.picture_url) {
                    return "";
                }
                return data.picture_url;
            }
        }
        const { data, error } = await supabase.from('users').select('picture_url').eq('id', props.userid).single();
        if (error || !data.picture_url) {
            return "";
        }
        return data.picture_url;
    }

    async function getBrand() {
        if(account.settings?.dashboard.display_name){
            const { data, error } = await supabase.from('users').select('brand_description').eq('id', props.userid).single();
            if (error || !data.brand_description) {
                return [account.settings?.dashboard.display_name, ""];
            }
            return [account.settings?.dashboard.display_name, data.brand_description];
        }
        const { data, error } = await supabase.from('users').select('brand_name, brand_description').eq('id', props.userid).single();
        if (error || !data.brand_name) {
            return ["", ""];
        }
        return [data.brand_name, data.brand_description];


    }

    const [picture, brand] = await Promise.all([getPicture(), getBrand()]);
    const [brandName, brandDescription] = brand;
    console.log(picture);
    return (
        <div className="flex flex-col pb-20 items-center">
            <div className="bg-red-400 rounded-md w-16 h-16 mb-4 shadow-md">
                {picture ? <Image className="rounded-md" unoptimized src={picture} width={64} height={64} alt="logo" /> : <div className=""></div>}
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Label className={cn("font-bold  text-4xl ", publicSans.className)}>{brandName}</Label>
                <Label className={cn(publicSans.className, " text-[#ffffff]/50")}>{brandDescription}</Label>
            </div>
        </div>
    )
}

export default NameAndPicture;