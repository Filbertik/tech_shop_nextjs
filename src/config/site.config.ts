export const siteConfig = {
  title: "Tech Hive",
  description: "Tech Shop",
  navItems: [
    { href: "/", label: "" },
    { href: "/ingredients", label: "Акції" },
    { href: "/contacts", label: "Контакти" },
    { href: "/about", label: "Доставка" },
  ],
  pagesContent: {
    "/": {
      content: "Тут будутьдані...",
    },
    "/ingredients": {
      content: "Дані...",
    },
    "/contacts": {
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
