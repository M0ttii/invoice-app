import { IconClipboardCopy, IconFileBroken, IconSignature, IconTableColumn } from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "../../bento-grid";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../card";
import { Button } from "../../button";
import { InvoiceTemplate1Preview } from "../../Invoice/InvoiceTemplates/Temp1"
import { RadioGroup } from "../../radio-group";
import InvoiceTemplate2Preview from "../../Invoice/InvoiceTemplates/Temp2";
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function TemplateGrid() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Invoice Template</CardTitle>
                    <CardDescription>
                        Select a template for your invoices.
                    </CardDescription>
                </div>
                <Button className="ml-auto gap-1">Preview <ExternalLink className="w-4 h-4" /></Button>
            </CardHeader>
            <CardContent>
            <RadioGroup className="">
                <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[35rem]">
                    
                        {items.map((item, i) => (
                            <BentoGridItem
                                key={i}
                                title={item.title}
                                content={item.content}
                                className={item.className}
                                radioValue={item.title}
                                radioId={item.title}
                            />
                        ))}

                </BentoGrid>
            </RadioGroup>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    )
}

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

type Dimensions = {
    height: number;
    width: number;
};

function scaleA4(factor: number): Dimensions {
    const A4 = { height: 297, width: 210 }; // A4 dimensions in mm

    return {
        height: A4.height * factor,
        width: A4.width * factor,
    };
}

const {height, width} = scaleA4(0.8);

export const Wrapper = () => {
    return (
        <div className="">
            <InvoiceTemplate1Preview/>
        </div>
    )
}

const items = [
    {
        title: "The Dawn of Innovation",
        description: "Explore the birth of groundbreaking ideas and inventions.",
        className: "md:col-span-1",
        content: <Wrapper/>,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "The Digital Revolution",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        className: "md:col-span-1",
        content: <InvoiceTemplate2Preview />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    }
];
