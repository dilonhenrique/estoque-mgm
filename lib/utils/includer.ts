const product = {
  category: true,
};

const service = {
  productsOnServices: {
    include: {
      product: {
        include: product,
      },
    },
  },
};

const customer = {
  address: true,
};

export const includer = {
  customer,
  product,
  service,
  procedure: {
    created_by: true,
    service: { include: service },
    customer: { include: customer },
    productsOnProcedures: {
      include: {
        product: {
          include: product,
        },
      },
    },
  },
};
