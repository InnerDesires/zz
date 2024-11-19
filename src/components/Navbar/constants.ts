const components: { title: string, children: { title: string; href: string; description: string }[] }[] = [
    {
        title: 'Розвивайся',
        children: [
            {
                title: "Категорії навчальних Курсів",
                href: "/",
                description: "Оберіть категорію, яка вас цікавить",
            },
            {
                title: "Останні додані курси",
                href: "/",
                description: "Перегляньте що додали останнім часом",
            },
            {
                title: "Мої Курси",
                href: "/",
                description: "Перегляньте ваші досягнення та прогрес",
            }
        ]
    }, {
        title: 'Будь в курсі',
        children: [
            {
                title: "Новини",
                href: "/",
                description: "Перегляньте останні новини",
            },
            {
                title: "Події",
                href: "/",
                description: "Перегляньте останні події",
            },
            {
                title: "Інше",
                href: "/",
                description: "Перегляньте останні новини",
            }
        ]
    }
]

export default components;