"use client";

// REACT
import { useEffect, useState } from "react";

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
  const [service, setService] = useState([]);
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
        : await servicesService.getAll({
            page: params?.page ? params.page : pagination.page,
            page_size: params?.pageSize ? params.pageSize : pagination.pageSize,
          });

      const resultCat = await categoryServiceServices.getAll();
      const resultImg = await imageServices.getAll();

      console.log("Fetch res: ", result, resultCat, resultImg);

      if (result?.results?.length > 0) {
        setDataProduct(result.results);
      } else {
        setDataProduct([]);
      }

      if (resultCat?.length) {
        resultCat.push({
          id: 0,
          category_name: "ALL",
        });

        setCategories(resultCat);
      }

      if (resultImg?.length) {
        setDataImage(resultImg);
      }

      const mergedProducts = result.results.map((service: any) => {
        const relatedImages = resultImg.filter(
          (img: any) => img.service_id === service.id
        );
        return {
          ...service,
          images: relatedImages.map((i: any) => i.url),
          image: relatedImages[0]?.url || "/images/placeholder.png",
        };
      });

      setService(mergedProducts);
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
      setService(bulks);
    } else {
      const filtered = _data.filter((items: any) => {
        return items.category === values.id;
      });

      setService(filtered);
    }
  };

  return (
    <>
      <section className="bg-white pt-28 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Services</h1>
            <div className="w-16 h-1 bg-indigo-500 mx-auto mt-2 rounded-full"></div>
          </div>

          {/* Filter */}
          <div className="flex justify-center space-x-6 mb-8">
            {categories.map((cat: any) => (
              <button
                key={cat?.id}
                className="text-gray-600 hover:text-purple-600 font-medium cursor-pointer transition-colors"
                onClick={() => onFilter(cat)}
              >
                {cat?.category_name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {service.map((item: any) => (
              <ServiceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
