'use client';

import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function NameAndPictureWrapper({ children }: PropsWithChildren) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}>
            {children}
        </motion.div>
    )
}