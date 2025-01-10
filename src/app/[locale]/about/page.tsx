'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function AboutPage() {
    const t = useTranslations('About');
    const url = useMemo(() => {
        return `https://picsum.photos/seed/2/1920/1080`;
    }, []);

    const memberPhotoSeeds = useMemo(() => {
        return Array.from({ length: t.raw('team.members').length }, (index) =>
            index
        );
    }, [t]);

    return (
        <>
            <section className="relative min-h-[calc(100vh-4rem)] flex items-center">
                <Image
                    src={url}
                    alt="Iron Squad Community"
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-black/60" />
                
                <div className="container mx-auto py-16 px-4 relative">
                    <motion.div 
                        className="max-w-4xl space-y-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-4">
                            <motion.h1 
                                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                            >
                                {t('title.line1')}
                                <br />
                                {t('title.line2')}
                            </motion.h1>
                            <motion.h2 
                                className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mt-8"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                            >
                                {t('name.line1')}
                                <br />
                                {t('name.line2')}
                            </motion.h2>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Button 
                                size="lg" 
                                className="px-8 py-6 text-lg bg-white text-black hover:bg-white/90"
                            >
                                {t('cta')} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <motion.div 
                className="bg-primary text-primary-foreground py-16"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <motion.div 
                            className="text-center space-y-4"
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold">
                                {t('stats.title')}
                            </h2>
                            <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto">
                                {t('stats.description')}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            {['children', 'squads', 'trainings', 'partners'].map((stat) => (
                                <motion.div 
                                    key={stat}
                                    className="space-y-2"
                                    variants={fadeInUp}
                                >
                                    <p className="text-5xl md:text-6xl font-bold text-accent">
                                        {t(`stats.${stat}.number`)}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {t(`stats.${stat}.label`)}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Team Section */}
            <motion.div 
                className="py-16 bg-background"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <motion.div 
                            className="text-center space-y-2"
                            variants={fadeInUp}
                        >
                            <h2 className="text-4xl font-bold text-foreground">
                                {t('team.title')}
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                {t('team.subtitle')}
                            </p>
                        </motion.div>

                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={stagger}
                        >
                            {t.raw('team.members').map((member: { name: string, role: string }, index: number) => (
                                <motion.div 
                                    key={index} 
                                    className="flex flex-col items-center space-y-4"
                                    variants={fadeInUp}
                                >
                                    <div className="relative w-48 h-48 rounded-full overflow-hidden">
                                        <Image
                                            src={`https://picsum.photos/seed/${memberPhotoSeeds[index]}/400/400`}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-lg text-foreground">
                                            {member.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {member.role}
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Facebook className="h-5 w-5" />
                                        </a>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Instagram className="h-5 w-5" />
                                        </a>
                                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                            <Twitter className="h-5 w-5" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Project Info Section */}
            <motion.div 
                className="py-16 bg-background"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={stagger}
            >
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-12">
                        <motion.h2 
                            className="text-4xl font-bold text-muted-foreground text-center"
                            variants={fadeInUp}
                        >
                            Про нас
                        </motion.h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div 
                                className="relative h-[400px] w-full"
                                variants={fadeInUp}
                            >
                                <Image
                                    src={`https://picsum.photos/seed/1/1920/1080`}
                                    alt="Project participants"
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </motion.div>

                            <motion.div 
                                className="space-y-6"
                                variants={stagger}
                            >
                                <motion.p 
                                    className="text-muted-foreground"
                                    variants={fadeInUp}
                                >
                                    Мета проекту - створення багатоступеневої сучасної системи підготовки молоді та дітей до життя, навчання, праці та розвитку в умовах воєнного часу. Учасники проекту- талановиті підлітки з визначними здобутками у навчанні, спорті, мистецтві і творчості, які внаслідок російської агресії втратили можливість розвивати свій потенціал, але не втратили бажання робити свій вклад у розвиток країни.
                                </motion.p>

                                <motion.p 
                                    className="text-muted-foreground"
                                    variants={fadeInUp}
                                >
                                    Назва проекту найкраще відповідає завданням, які стоять перед українською молоддю – «Залізна зміна» – сильна, згуртована, розумна, спортивна, мужня, патріотична нація, яка зробить європейську Україну процвітаючою, прогресуючою, щасливою державою.
                                </motion.p>

                                <motion.p 
                                    className="text-muted-foreground"
                                    variants={fadeInUp}
                                >
                                    Над створенням проекту працювали потужні компанії: АТ «Укрзалізниця», Благодійна організація «Благодійний Фонд Центр взаємодопомоги Спасємо Україну» та фонд Говарда Баффетта. За весь час співпраці ми заручилися підтримкою таких партнерів: Multiplex, Ajax, Sense Bank та Аврора. Організації, що стрімко прогресують на ринку України.
                                </motion.p>

                                <motion.p 
                                    className="text-muted-foreground"
                                    variants={fadeInUp}
                                >
                                    Випускниками проекту від вересня 2023 року стали понад 1000 школярів з усієї України. Участь у проекті безкоштовна. Учасники мобільного підліткового проекту «Залізна зміна» 12 днів, шляхами української залізниці, мандрують містами західної України: Тернопіль, Івано-Франківськ, Ужгород, Чоп, Львів, Буковель тощо, де зустрічаються із лідерами в сфері бізнесу та політики, а також з військовими, лікарями, артистами, бізнес-тренерами тощо. Відвідують сучасні українські та міжнародні компанії, де здобувають лідерські навички, які необхідні для успішних кроків у доросле життя сучасного українського суспільства.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}