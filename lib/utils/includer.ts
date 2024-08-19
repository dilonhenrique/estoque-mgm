const product = {
  category: true,
};

export const includer = {
  customer: {
    address: true,
  },
  product,
  service: {
    productsOnServices: {
      include: {
        product: {
          include: product,
        },
      },
    },
  },
};
