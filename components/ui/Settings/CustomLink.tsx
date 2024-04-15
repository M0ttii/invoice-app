'use client'

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

interface Props {
    path: string,
    parallelRoutesKey?: string,
    item: Item
}

export type Item = {
    text: string;
    slug?: string;
    segment?: string;
    parallelRoutesKey?: string;
  };

export default function CustomLink({ path, parallelRoutesKey, item }: Props) {
    const segment = useSelectedLayoutSegment(parallelRoutesKey);
    const href = item.slug ? path + '/' + item.slug : path;

    const isAcive = (!item.slug && segment === null) ||
    segment === item.segment ||
    // Nested pages e.g. `/layouts/electronics`
    segment === item.slug;
    return (
        <Link href={href} className={isAcive ? "font-semibold text-primary" : ""}>
            {item.text}
        </Link>
    )

}