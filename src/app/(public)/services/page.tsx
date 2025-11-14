"use client";

// REACT
import { useEffect, useState } from "react";
import Link from "next/link";

// Antd Components
import { Button, Spin } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";

// Services
import api from "@/api/context/config";
import { servicesService } from "@/api/services/service/service";
import { categoryServiceServices } from "@/api/services/master/category";
import { imageServices } from "@/api/services/image/service";

// Page Components
import ServiceCard from "@/app/components/services/ServiceCard";

const services = [
  {
    id: 1,
    name: "Adobe Photoshop",
    price: 15000,
    image: "/images/photoshop.jpg",
    category: "Editing",
    prefix: "Start from",
  },
  {
    id: 2,
    name: "Service Earphone",
    price: 75000,
    image: "/images/soundcore_02.png",
    category: "Service Headphone",
    prefix: "Start from",
  },
  {
    id: 3,
    name: "Video Editing",
    price: 500000,
    image: "/images/premiere.jpg",
    category: "Editing",
    prefix: "Start from",
  },
  {
    id: 4,
    name: "Maintenance Earphone",
    price: 100000,
    image: "/images/airpods.png",
    category: "Maintenance",
    prefix: "Start from",
  },
];

const categories = ["All", "Editing", "Service Headphone", "Maintenance"];

export default function ServicePage() {
  // STATE
  const [service, setService] = useState<any[]>([]);
  const [bulks, setBulks] = useState([]);

  const [dataProduct, setDataProduct] = useState([]);
  const [dataImage, setDataImage] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
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
        : await servicesService.getAll({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
          });

      const resultCat = await categoryServiceServices.getAll();
      const resultImg = await imageServices.getAll();

      console.log("Fetch res: ", result, resultCat, resultImg);

      if (result?.results?.length > 0) {
        // setDataProduct(result.results);
        setService(result.results);
        setBulks(result.results);
      } else {
        // setDataProduct([]);
        setService(result.results);
        setBulks(result.results);
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
        setLoading(false);
      }, 500);
    }
  };

  // On Filter
  const onFilter = (values: any) => {
    const _data = bulks.length > 0 ? bulks : [];
    console.log("On Filter: ", values);

    if (values.id == 0) {
      setService(bulks);
    } else {
      const filtered: any[] = _data.filter((items: any) => {
        return items.category === values.id;
      });

      const newCategory: any[] = categories.map((item: any) => {
        if (item.id === values.id) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });

      // console.log(newCategory);

      setCategories(newCategory);
      setService(filtered);
    }
  };

  // if (service.length === 0) {
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

  if (loading) {
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Services</h1>
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-center">
            {categories.map((cat: any) => (
              <button
                key={cat?.id}
                className={`${
                  cat?.selected ? "text-blue-600 font-bold" : "text-gray-600 font-medium"
                } hover:text-purple-600  cursor-pointer transition-colors`}
                onClick={() => onFilter(cat)}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {service.map((item: any) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </div>

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
      </section>
    </>
  );
}
