const components: { title: string, children: { title: string; href: string; description: string }[] }[] = [
    {
        title: 'Розвивайся',
        children: [
            {
                title: 'block1item1',
                href: "/",
                description: 'block1item1description',
            },
            {
                title: "block1item2",
                href: "/",
                description: "block1item2description",
            },
            {
                title: "block1item3",
                href: "/",
                description: "block1item3description",
            }
        ]
    }, {
        title: 'Будь в курсі',
        children: [
            {
                title: "block2item1",
                href: "/",
                description: "block2item1description",
            },
            {
                title: "block2item2",
                href: "/",
                description: "block2item2description",
            },
            {
                title: "block2item3",
                href: "/",
                description: "block2item3description",
            }
        ]
    }
]

export default components;