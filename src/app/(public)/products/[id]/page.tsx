"use client";

// REACT
import { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

// Antd Components
import { Form, Image, Spin } from "antd";

// Service
import { Images, imageServices } from "@/api/services/image/service";
import { Products, productServices } from "@/api/services/product/product";

// REDUX
import { useDispatch } from "react-redux";
import { addToCart } from "@/stores/cart/cart";

// ICONS
import { BiCart } from "react-icons/bi";

// FORMATTER
import { formatPrice } from "@/utils/function/price";

// CODE
export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // DISPATCH
  const dispatch = useDispatch();
  // PROPS
  // const { id } = use(params);
  const { id } = useParams();

  // Data
  const [data, setData] = useState<Products>();
  // const product = products.find((p: any) => p.id.toString() === id);
  const [fileList, setFileList] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [selectedVar, setSelectedVar] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  // FORMS
  const [form] = Form.useForm();

  // USE EFFECTS
  useEffect(() => {
    if (id) {
      fetchDetails(id);
    }
  }, [id]);

  // FETCH DETAILS
  const fetchDetails = async (values: any) => {
    setLoading(true);

    console.log("ID: ", values, id);
    const _id = values > 0 ? values : id;

    try {
      const result = await productServices.getById(_id);
      await fetchImage(id);

      console.log("Edit: ", result);

      setData(result);

      form.setFieldsValue({
        category: result?.category,
        code: result?.code,
        colors: result?.colors?.length > 0 ? result.colors : [],
        variants: result?.variants?.length > 0 ? result.variants : [],
        description: result?.description,
        details: result?.details,
        discount: result?.discount,
        is_colors: result.is_color,
        is_ready: result.is_ready,
        is_variants: result.is_variants,
        price: result.price,
        product_name: result?.product_name,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // Fetch Images
  const fetchImage = async (id: any) => {
    try {
      const resImg: [] = await imageServices.getAll();

      if (resImg) {
        const map = resImg.filter((items: Images) => {
          console.log("Image: ", resImg, items, id);
          return items?.product_id == id;
        });

        console.log("MAPPED: ", map);
        setFileList(map);
        setMainImage(map.length > 0 ? map[0]?.url : "");
      } else {
        setFileList([]);
      }
    } catch (error) {}
  };

  if (!data) {
    return <p className="text-center mt-20">Product not found.</p>;
  }

  if (loading) {
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
      <Spin size="large" />
    </div>;
  }

  // Handle Add
  const handleAdd = () => {
    console.log("Qty: ", quantity);

    dispatch(
      addToCart({
        id: Number(data?.id),
        name: data.product_name,
        price: Number(data.price),
        variant: selectedVar,
        quantity: quantity,
        image: mainImage,
        type: "product",
      })
    );
  };

  return (
    <section className="min-h-screen bg-white py-12 px-6">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/products" className="hover:underline">
          Shop
        </Link>
        &gt; <span className="text-black">{data.product_name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-4 col-span-2">
          {fileList.map((img: any, i: number) => (
            <div
              key={i}
              className="relative w-20 h-20 border rounded-md"
              onClick={() => setMainImage(img?.url)}
            >
              <Image
                src={img.url || "error"}
                alt={data.product_name || `img-${i}`}
                className="object-cover rounded-md  cursor-pointer"
                preview={false}
                fallback="data:image/png;base64,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"
              />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className="relative col-span-6 aspect-square border hover:scale-105 transition-transform duration-500 rounded-md">
          <Image
            src={mainImage || fileList[0]}
            alt={data.product_name || `img`}
            preview={false}
            className="object-contain cursor-pointer"
            fallback="data:image/png;base64,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"
          />
        </div>

        {/* Info */}
        <div className="col-span-4">
          <h1 className="text-3xl font-bold text-black mb-4">
            {data.product_name}
          </h1>
          <div className="text-gray-500 mb-6">
            {data.discount && (
              <span className="line-through mr-3">
                {formatPrice(Number(data.price))}
              </span>
            )}
            <span className="text-2xl font-semibold text-black">
              {formatPrice(
                data?.discount
                  ? Number(data?.price) - Number(data.discount)
                  : Number(data.price)
              )}
            </span>
          </div>

          <h3 className="text-black font-semibold mb-2">DESCRIPTION</h3>
          <p className="text-black mb-6">{data.description}</p>

          <h3 className="text-black font-semibold mb-2">DETAILS</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
            {data.details}
            {/* {data.details.map((d, i) => (
              <li key={i}>{d}</li>
            ))} */}
          </ul>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-black">Variants:</h3>
            <div className="flex gap-2">
              {(data?.colors ?? []).map((variant: any) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVar(variant)}
                  className={`px-4 py-2 border border-black rounded ${
                    selectedVar === variant
                      ? "bg-gray-700 text-white hover:bg-gray-950 hover:text-shadow-amber-100"
                      : "bg-white text-black hover:bg-blue-500 hover:text-white"
                  } cursor-pointer`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2 text-black">Quantity:</h3>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-50 px-3 py-2 border rounded text-black"
            />
          </div>
          {/* <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-1 border rounded bg-gray-400 hover:bg-gray-500 cursor-pointer"
            >
              -
            </button>
            <span className="px-16 py-1 items-center rounded bg-gray-400">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-1 border rounded bg-gray-400 hover:bg-gray-500 cursor-pointer"
            >
              +
            </button>
          </div> */}

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-blue-600 px-3 py-2 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            <BiCart /> Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
