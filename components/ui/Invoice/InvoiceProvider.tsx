import  Invoice  from './Invoice';

interface Props {
	userid: string;
}

export default function InvoiceProvider({ userid }: Props) {
    
    return (
        <Invoice userid={userid}/>
    )
}