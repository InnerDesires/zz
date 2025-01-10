"use client"
import * as React from "react"
import { Moon, Sun, Laptop, RefreshCcw } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const cycleTheme = () => {
        if (theme === 'light') setTheme('dark')
        else if (theme === 'dark') setTheme('system')
        else setTheme('light')
    }

    if (!mounted) {
        return (
            <Button 
                variant="outline" 
                size="icon" 
                className="relative align-middle mr-1 w-9 h-9"
            >
                <RefreshCcw className="h-[1.2rem] w-[1.2rem]" />
            </Button>
        )
    }

    return (
        <Button 
            variant="ghost" 
            size="icon" 
            onClick={cycleTheme}
            className="relative align-middle mr-1 w-9 h-9"
        >
            <Sun className={cn(
                "h-[1.2rem] w-[1.2rem] rotate-0 transition-all",
                theme === "light" ? "scale-100" : "scale-0 -rotate-90"
            )} />
            <Moon className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all",
                theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
            )} />
            <Laptop className={cn(
                "absolute h-[1.2rem] w-[1.2rem] transition-all",
                theme === "system" ? "scale-100 rotate-0" : "scale-0 rotate-90"
            )} />
        </Button>
    )
}
