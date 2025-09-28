export type Client = {
  id: number;
  name: string;
  price: number | undefined | null;
  status: "primary" | "danger" | "success" | "warning" | "neutral";
  date: string;
  code: string | undefined | null;
  discount?: number | undefined | null;
};
