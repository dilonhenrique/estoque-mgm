import { customerService } from "@/backend/services/customers";
import CustomerForm from "@/components/Customer/CustomerForm";

export default async function SingleCustomerPage({
  params,
}: {
  params: { customerId: string };
}) {
  const { customerId } = params;
  const customer = await customerService.findById(customerId);

  return (
    <main className="p-8">
      <div className="w-full flex flex-col gap-4 justify-between">
        <h2>Edite seu cliente</h2>
        <CustomerForm customer={customer.data} />
      </div>
    </main>
  );
}
