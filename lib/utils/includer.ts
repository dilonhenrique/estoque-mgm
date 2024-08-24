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

const procedure = {
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
};

const logWithProduct = { product: { include: product } };
const logWithAction = {
  procedure: { include: procedure },
  // purchase: { include: purchase },
};

const productWithLogs = { ...product, logs: { include: logWithAction } };

export const includer = {
  customer,
  product,
  productWithLogs,
  service,
  procedure,
  procedureWithLog: {
    ...procedure,
    logs: {
      include: logWithProduct,
    },
  },
};
