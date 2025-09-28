export type Payment = {
  id?: number;
  payment_name: string;
  payment_number: string | undefined | null;
  description?: string | undefined | null;
};
