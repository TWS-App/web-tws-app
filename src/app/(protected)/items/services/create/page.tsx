"use client";

import Breadcrumb from "@/app/components/breadcrumb/breadcrumb";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Form = {
  category: number;
  code: string;
  service_name: string;
  description: string;
  details: string;
  discount: number;
  is_colors: boolean;
  is_ready: boolean;
  is_variants: boolean;
  price: number;
  colors: string[]; // final payload
  variants: string[]; // final payload
};

const initialForm: Form = {
  category: 0,
  code: "",
  service_name: "",
  description: "",
  details: "",
  discount: 0,
  is_colors: true,
  is_ready: true,
  is_variants: true,
  price: 0,
  colors: [],
  variants: [],
};

export default function CreateServicePage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  // helper state for comma-separated inputs
  const [colorsInput, setColorsInput] = useState<string>("");
  const [variantsInput, setVariantsInput] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement; // safe cast
    const { name, type } = target;

    if (type === "checkbox") {
      setForm(
        (prev) => ({ ...prev, [name]: target.checked } as unknown as Form)
      );
      return;
    }

    if (type === "number") {
      const num = target.value === "" ? 0 : Number(target.value);
      setForm((prev) => ({ ...prev, [name]: num } as unknown as Form));
      return;
    }

    // text/textarea defaults
    setForm((prev) => ({ ...prev, [name]: target.value } as unknown as Form));
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "colors" | "variants",
    index: number
  ) => {
    const newArr = [...form[field]];
    newArr[index] = e.target.value;
    setForm({ ...form, [field]: newArr });
  };

  const addArrayItem = (field: "colors" | "variants") => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // parse comma separated values
    const colors = colorsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const variants = variantsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload: Form = {
      ...form,
      colors,
      variants,
    };

    // simulasikan request ke API
    console.log("Submitting product payload:", payload);

    // TODO: replace with actual fetch / mutation
    // await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload) });

    // setelah sukses balik ke page products
    router.push("/items/services");
  };

  const handleCancel = () => {
    // Reset form + navigate back to products list
    setForm(initialForm);
    setColorsInput("");
    setVariantsInput("");
    router.push("/items/services");
  };

  return (
    <div className="p-6">
      <Breadcrumb
        items={["Items", "Service", "Create"]}
        path={["/items", "/items/create", "/items/service/create"]}
      />

      <h1 className="text-2xl font-semibold mb-6">Creates New Services</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-800 p-6 rounded-lg text-gray-200"
      >
        <label className="block mb-1 text-sm font-medium">Category</label>
        <input
          type="number"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Code</label>
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Service Name</label>
        <input
          type="text"
          name="service_name"
          placeholder="Service Name"
          value={form.service_name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Details</label>
        <textarea
          name="details"
          placeholder="Details"
          value={form.details}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Price</label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <label className="block mb-1 text-sm font-medium">Discount</label>
        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700 border border-gray-600"
        />

        <div>
          <label className="block mb-2">Colors</label>
          {form.colors.map((color, idx) => (
            <input
              key={idx}
              type="text"
              value={color}
              onChange={(e) => handleArrayChange(e, "colors", idx)}
              className="w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("colors")}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            + Add Color
          </button>
        </div>

        <div>
          <label className="block mb-2">Variants</label>
          {form.variants.map((variant, idx) => (
            <input
              key={idx}
              type="text"
              value={variant}
              onChange={(e) => handleArrayChange(e, "variants", idx)}
              className="w-full p-2 mb-2 rounded bg-gray-700 border border-gray-600"
            />
          ))}
          <button
            type="button"
            onClick={() => addArrayItem("variants")}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          >
            + Add Variant
          </button>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_colors"
              checked={form.is_colors}
              onChange={handleChange}
            />
            Is Colors
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_ready"
              checked={form.is_ready}
              onChange={handleChange}
            />
            Is Ready
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_variants"
              checked={form.is_variants}
              onChange={handleChange}
            />
            Is Variants
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded border border-white bg-red-400 hover:bg-red-500 cursor-pointer transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
