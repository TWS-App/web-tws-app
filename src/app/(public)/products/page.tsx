"use client";

// REACT
import { useEffect, useState } from "react";
import Link from "next/link";

// ANTD COMPONENTS
import { Button, Input, Spin, Tooltip } from "antd";
import { BiHome } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { PiMagnifyingGlassFill } from "react-icons/pi";
import { FaCartShopping } from "react-icons/fa6";

// Services
import { imageServices } from "@/api/services/image/service";
import api from "@/api/context/config";
import { productServices } from "@/api/services/product/product";
import { categoryProductServices } from "@/api/services/master/category";

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
  const [product, setProduct] = useState<any[]>([]);
  const [bulks, setBulks] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Loading
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pageSize: 10,
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
            search: params?.search ?? null,
          });

      const resultCat = await categoryProductServices.getAll();

      console.log("Fetch res: ", result, resultCat);

      if (result?.results?.length > 0) {
        setProduct(result.results);
        setBulks(result.results);
        // setDataProduct(result.results);
      } else {
        setBulks([]);
        setProduct([]);
        // setDataProduct([]);
      }

      if (resultCat?.length) {
        resultCat.push({
          id: 0,
          category_name: "ALL",
        });

        setCategories(resultCat);
      }

      setPagination({
        total: result?.total ?? 0,
        page: result?.page ?? 1,
        pageSize: result?.page_size ?? 5,
        next: result.links?.next || null,
        previous: result.links?.previous || null,
      });
    } catch (err) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setLoading(false);
      }, 500);
    }
  };

  // On Filter
  const onFilter = (values: any) => {
    const _data = bulks.length > 0 ? bulks : [];
    console.log("On Filter: ", values);

    if (values.id == 0) {
      setProduct(bulks);
    } else {
      const filtered: any[] = _data.filter((items: any) => {
        return items.category === values.id;
      });

      const newCategory: any[] = categories.map((item: any) => {
        if (item.category_name === values.category_name) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });

      setCategories(newCategory);
      setProduct(filtered);
    }
  };

  // SEARCH FUNCTION
  const onSearch = () => {
    setIsSearchOpen(false);

    fetchData({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search: searchQuery,
    });
  };

  // if (product.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center mt-28 bg-gray-600 p-5 rounded-2xl">
  //       <FaCartShopping size={75} />

  //       <p className="p-6 text-white">
  //         Sorry, There are no Products/Services. Please, contact the admin!
  //       </p>

  //       <Link href="/">
  //         <Button icon={<BiHome />} color="geekblue" variant="solid">
  //           Home
  //         </Button>
  //       </Link>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm rounded-lg">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-white pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col justify-center gap-2 text-center mb-8">
            <h1 className="text-3xl font-bold text-[#108ee9]">Products</h1>
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>

            <div className="flex justify-center w-full">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <Input.Search
                  placeholder="Search Product..."
                  enterButton="Search"
                  value={searchQuery ?? ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  loading={loading}
                  size="large"
                  suffix={
                    <IoCloseCircle
                      className="text-black hover:text-red-500 cursor-pointer"
                      size={24}
                      onClick={() => {
                        setSearchQuery(null);
                        fetchData({
                          page: pagination.page,
                          pageSize: pagination.pageSize,
                          search: null,
                        });
                      }}
                    />
                  }
                  onSearch={onSearch}
                />
              </div>
            </div>
          </div>
          {/* <div className="text-center mb-8">
            <div className="flex justify-center gap-2">
              <h1 className="text-3xl font-bold text-[#108ee9]">Products</h1>

              <Tooltip title="Search?">
                <PiMagnifyingGlassFill
                  className="text-[#108ee9] hover:text-[#046cc2] hover:scale-105 transition-colors cursor-pointer"
                  size={28}
                  onClick={() => setIsSearchOpen(true)}
                />
              </Tooltip>
            </div>

            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          {isSearchOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-start pt-24 z-50"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setProduct(bulks);
              }}
            >
              <div
                className="bg-white w-11/12 md:w-1/2 p-4 rounded-xl shadow-lg flex items-center gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <Input.Search
                  placeholder="Search Product..."
                  enterButton="Search"
                  value={searchQuery ?? ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  loading={loading}
                  size="large"
                  suffix={
                    <IoCloseCircle
                      className="text-black hover:text-red-500 cursor-pointer"
                      size={24}
                      onClick={() => setIsSearchOpen(false)}
                    />
                  }
                  onSearch={onSearch}
                />
                {/* <input
                  type="text"
                  placeholder="Search product..."
                  className="w-full outline-none text-lg text-gray-700"
                  value={searchQuery ?? ""}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />

                <IoCloseCircle
                  className="text-black hover:text-red-500 cursor-pointer"
                  size={24}
                  onClick={() => setIsSearchOpen(false)}
                />

                <button
                  onClick={onSearch}
                  className="px-3 py-1 bg-[#1554ad] text-white rounded-lg hover:bg-[#1668dc] cursor-pointer"
                >
                  Search
                </button> 
              </div>
            </div>
          )} */}

          <div className="flex flex-wrap justify-center gap-4 mb-8 text-center">
            {categories.map((cat: any) => (
              <button
                key={cat.id}
                className={`${
                  cat?.selected
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 font-medium"
                } hover:text-purple-600  cursor-pointer transition-colors`}
                onClick={() => onFilter(cat)}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product.map((item: any) => (
              <ProductCard key={item.id} item={item} loading={loading} />
            ))}
          </div>
        </div>

        {!loading && (
          <div className="flex justify-center items-center gap-2 m-auto mt-20">
            <div className="flex items-center gap-2">
              <label htmlFor="rows" className="text-sm text-white">
                Rows per page:
              </label>

              <select
                id="rows"
                value={pagination.pageSize}
                onChange={(e) => {
                  const newSize = Number(e.target.value);
                  const newPage =
                    pagination.total / newSize < newSize ? 1 : pagination.page;

                  fetchData?.({
                    page: newPage,
                    pageSize: newSize || 10,
                  });
                }}
                className="bg-gray-700 text-white rounded px-2 py-1 cursor-pointer hover:bg-gray-600"
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => {
                fetchData({
                  linkUrl: pagination.previous || null,
                });
              }}
              disabled={!pagination.previous}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(1)].map((_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded cursor-pointer transition ${
                  pagination.page === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {pagination.page}
              </button>
            ))}

            <button
              onClick={() => {
                // setPage((prev) => Math.min(prev + 1, totalPages));

                fetchData({
                  linkUrl: pagination.next || null,
                });
              }}
              disabled={!pagination.next}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 hover:text-blue-400 transition cursor-pointer disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </>
  );
}
