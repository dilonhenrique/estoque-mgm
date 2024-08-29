type MenuItem = {
  label: string;
  url: string;
  iconKey: string;
};

export const menuItems: MenuItem[] = [
  {
    label: "Produtos",
    url: "/produtos",
    iconKey: "product",
  },
  {
    label: "Clientes",
    url: "/clientes",
    iconKey: "customer",
  },
  {
    label: "Fornecedores",
    url: "/fornecedores",
    iconKey: "supplier",
  },
  {
    label: "Serviços",
    url: "/servicos",
    iconKey: "service",
  },
  {
    label: "Procedimentos",
    url: "/procedimentos",
    iconKey: "procedure",
  },
  {
    label: "Compras",
    url: "/compras",
    iconKey: "purchase",
  },
];
