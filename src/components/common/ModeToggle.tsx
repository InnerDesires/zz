"use client"
import { useState, useEffect } from "react"
import { Moon, Sun, Laptop, RefreshCcw } from "lucide-react"
import { useTheme } from "next-themes"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function ModeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const t = useTranslations('ThemeNames');
    useEffect(() => {
        setMounted(true)
    }, [])

    const getThemeLabel = () => {
        if (theme === 'light') return t('light')
        else if (theme === 'dark') return t('dark')
        else return t('system')
    }

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
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent side="bottom" className="z-50">
                    <p className="text-sm font-medium">{getThemeLabel()}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
