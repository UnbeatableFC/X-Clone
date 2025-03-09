import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";
import React from "react";

const spinnerVariants = cva('animate-spin fill-current', {
    variants: {
        size: {
            default: "h-4 w-4",
            sm: "h-2 w-2",
            lg: "h-6 w-6",
            icon: "h-10 w-10",
        }
    }, defaultVariants : {
        size:'default',
    }
})

interface SpinnerProps extends VariantProps <typeof spinnerVariants> {
    className? : string
}

const Spinner = ({size, className} : SpinnerProps) => {
  return <Loader className= {cn(spinnerVariants({size}), className)} />
};

export default Spinner;
