"use client"

import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Input, InputProps } from "./input"
import { Badge } from "./badge"

type Props = {
    selected: Date[] | undefined,
    setSelected: (dates: Date[] | undefined) => void
} & InputProps

export function DatePicker( {selected, setSelected, ...props} : Props) {
    const removeDate = (i: number) => {
        if (typeof selected === "undefined") return

        const newSelected = [...selected]
        newSelected.splice(i, 1)
        setSelected(newSelected)
    }

    return (
        <>
            <Input {...props} type="date" className="sr-only" />
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            (typeof selected !== "undefined" && selected.length == 0) && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Pick a date
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="multiple"
                        selected={selected}
                        onSelect={setSelected}
                    />
                </PopoverContent>
            </Popover>
            <div className="mt-2 grid grid-cols-3 gap-2 max-w-80">
                {typeof selected !== "undefined" && selected.map((date, i) => (
                    <Badge
                        className="w-fit hover:cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                        onClick={() => removeDate(i)}
                        key={`sel-d-${i}`}>
                        {date.toDateString()}
                    </Badge>
                ))}
            </div>
        </>
    )
}

