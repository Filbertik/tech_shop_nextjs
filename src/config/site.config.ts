export const siteConfig = {
  title: "Tech Hive",
  description: "Tech Shop",
  navItems: [
    { href: "/", label: "Акції" },
    { href: "/ingredients", label: "Контакти" },
    { href: "/about", label: "Доставка" },
  ],
  pagesContent: {
    "/": {
      content: "Тут будутьдані...",
    },
    "/ingredients": {
      content: "Дані...",
    },
    "/about": {
      content: `
        <p>
          Опис
        </p>
          <br/>
        <h2>Опис</h2>
          <br/
         <ul>
          <li>
            <strong>Опис</strong> - Опис
          </li>
          <li>
            <strong>Опис</strong> - Опис
          </li>
          <li>
            <strong>Опис/strong> - Опис
          </li>
          <li>
            <strong>Опис</strong> - Опис
          </li>
          <li>
            <strong>Опис</strong> - Опис
          </li>
        </ul>
      `,
    },
  },
};
