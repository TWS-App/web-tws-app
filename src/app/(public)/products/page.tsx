"use client";

// REACT
import { useEffect, useState } from "react";

// Services
import api from "@/api/context/config";
import { productServices } from "@/api/services/product/product";
import { categoryProductServices } from "@/api/services/master/category";
import { imageServices } from "@/api/services/image/service";

// Page Components
import ProductCard from "@/app/components/products/ProductCard";

// CONST
const products = [
  {
    id: 1,
    name: "Tozo Aerosound 3",
    price: 295000,
    image: "/images/tozo_01.png",
    category: "Earphone",
  },
  {
    id: 2,
    name: "Soundcore",
    price: 299000,
    image: "/images/soundcore_01.png",
    category: "Earphone",
  },
  {
    id: 3,
    name: "Airpods",
    price: 5000000,
    oldPrice: 6000000,
    image: "/images/airpods_02.jpg",
    category: "Earphone",
  },
  // {
  //   id: 4,
  //   name: "Sonia Skirt",
  //   price: "$50.00",
  //   image: "/images/product-04.jpg",
  //   category: "Bottoms",
  // },
];

// CODE
export default function ProductsPage() {
  // STATE
  const [product, setProduct] = useState([]);
  const [bulks, setBulks] = useState([]);

  const [dataProduct, setDataProduct] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 5,
    next: null,
    previous: null,
  });

  // USE EFFECTS
  useEffect(() => {
    fetchData({ page: pagination.page, pageSize: pagination.pageSize });
  }, []);

  // Fetch Data
  const fetchData = async (params: any) => {
    setLoading(true);

    try {
      const result = params?.linkUrl
        ? await api.get(params.linkUrl).then((res) => {
            return res.data;
          })
        : await productServices.getAll({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
          });

      const resultCat = await categoryProductServices.getAll();
      const resultImg = await imageServices.getAll();

      console.log("Fetch res: ", result, resultCat, resultImg);

      if (result?.results?.length > 0) {
        setDataProduct(result.results);
      } else {
        setDataProduct([]);
      }

      if (resultCat?.length) {
        // let arr = [
        //   {
        //     id: 0,
        //     category_name: "ALL",
        //   },
        // ];

        resultCat.push({
          id: 0,
          category_name: "ALL",
        });

        setCategories(resultCat);
      }

      if (resultImg?.length) {
        setDataImage(resultImg);
      }

      const mergedProducts = result.results.map((product: any) => {
        const relatedImages = resultImg.filter(
          (img: any) => img.product_id === product.id
        );
        return {
          ...product,
          images: relatedImages.map((i: any) => i.url),
          image: relatedImages[0]?.url || "/images/placeholder.png",
        };
      });

      setProduct(mergedProducts);
      setBulks(mergedProducts);
      // console.log("merged: ", mergedProducts);

      setPagination({
        total: result?.total ?? 0,
        page: result?.page ?? 1,
        pageSize: result?.page_size ?? 5,
        next: result.links?.next || null,
        previous: result.links?.previous || null,
      });
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // On Filter
  const onFilter = (values: any) => {
    const _data = bulks.length > 0 ? bulks : [];
    console.log("On Filter: ", values);

    if (values.id == 0) {
      setProduct(bulks);
    } else {
      const filtered = _data.filter((items: any) => {
        return items.category === values.id;
      });

      setProduct(filtered);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-white pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Products</h1>
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          <div className="flex justify-center space-x-6 mb-8">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                className="text-gray-600 hover:text-purple-600 font-medium cursor-pointer transition-colors"
                onClick={() => onFilter(cat)}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {product.map((item: any) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
