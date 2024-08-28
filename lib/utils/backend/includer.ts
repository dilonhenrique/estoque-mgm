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

const supplier = {
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

const purchase = {
  supplier: { include: supplier },
  purchaseItems: { include: { product: { include: product } } },
};

const logWithProduct = { product: { include: product } };
const logWithAction = {
  procedure: { include: procedure },
  // purchase: { include: purchase },
};

const productWithLogs = { ...product, logs: { include: logWithAction } };

const logComplete = { ...logWithProduct, ...logWithAction };

export const includer = {
  customer,
  supplier,
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
  purchase,
  purchaseWithLog: {
    ...purchase,
    logs: {
      include: logWithProduct,
    },
  },
  logComplete,
};
