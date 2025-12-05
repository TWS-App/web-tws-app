"use client";

// REACT
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Antd Components
import { Button, Image, Input, Spin } from "antd";
import { FaCartShopping } from "react-icons/fa6";
import { BiHome } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

// Services
import api from "@/api/context/config";
import { servicesService } from "@/api/services/service/service";
import { categoryServiceServices } from "@/api/services/master/category";
import { imageServices } from "@/api/services/image/service";

// Page Components
import ServiceCard from "@/app/components/services/ServiceCard";

// CONST
const mediasocials = [
  {
    src: "/images/assets/Tiktok.png",
    link: "https://www.tiktok.com/@yhusan.digital",
    key: "tiktok",
  },
  {
    src: "/images/assets/Shopee.png",
    link: "https://shopee.co.id/yhusan.digital?entryPoint=ShopBySearch&searchKeyword=yhusan%20digital",
    key: "shopee",
  },
  {
    src: "/images/assets/instagram.png",
    link: "https://instagram.com/yhusan.digital",
    key: "instagram",
  },
  {
    src: "/images/assets/Youtube.png",
    link: "https://www.youtube.com/@yhusan",
    key: "youtube",
  },
  {
    src: "/images/assets/facebook.png",
    link: "https://web.facebook.com/people/Yhusan-Digital/61567746741538/#",
    key: "facebook",
  },
];

// List Service Assets
const listServices = [
  {
    src: "/images/assets/Service_speaker.png",
    alt: "service-speaker",
    key: "speaker",
    link: "services/speaker",
  },
  {
    src: "/images/assets/Service_Baterai.png",
    alt: "service-baterai",
    key: "baterai",
    link: "services/baterai",
  },
  {
    src: "/images/assets/Service_Mainboard.png",
    alt: "service-mainboard",
    link: "services/mainboard",
    key: "mainboard",
  },
  {
    src: "/images/assets/Service_tidakdiketahui.png",
    alt: "service-unknown",
    link: "services/unknown",
    key: "unknown",
  },
];

// CODE
export default function ServicePage() {
  // Router
  const router = useRouter();

  // STATE
  const [service, setService] = useState<any[]>([]);
  const [bulks, setBulks] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Boolean
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
            search: params?.search ?? null,
          });

      const resultCat = await categoryServiceServices.getAll();

      console.log("Fetch res: ", result, resultCat);

      if (result?.results?.length > 0) {
        // setDataProduct(result.results);
        setService(result.results);
        setBulks(result.results);
      } else {
        // setDataProduct([]);
        setService([]);
        setBulks([]);
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
        setIsLoading(false);
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

  // SEARCH FUNCTION
  const onSearch = () => {
    fetchData({
      page: pagination.page,
      pageSize: pagination.pageSize,
      search: searchQuery,
    });
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
            <h1 className="text-3xl font-bold text-[#108ee9]">
              SERVICE SEMUA MERK TWS
            </h1>
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
                  // style={{
                  //   width: "500px",
                  //   display: "flex",
                  //   justifyContent: "center",
                  // }}
                />
              </div>
            </div>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 text-center">
            {categories.map((cat: any) => (
              <div key={cat.id} className="flex flex-wrap">
                <button
                  key={cat?.id}
                  className={`${
                    cat?.selected
                      ? "text-blue-600 font-bold"
                      : "text-gray-600 font-medium"
                  } hover:text-purple-600 hover:font-bold hover:scale-105 cursor-pointer transition-transform`}
                  onClick={() => onFilter(cat)}
                >
                  {cat?.category_name}
                </button>

                {cat.id > 0 && <div className="text-black ml-2">{`•`}</div>}
              </div>
            ))}
          </div>

          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Image
                src={"/images/assets/MAIN_BANNER.png"}
                alt={"MAIN_BANNER"}
                className="object-contain group-hover:scale-105 transition-transform duration-500 bg-gray-200"
                // height={300}
                fallback="data:image/png;base64,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"
                preview={false}
              />
            </div>

            {/* Social Media */}
            <div className="mt-10 mb-5 flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
              {mediasocials.map((logo: any, index: number) => (
                <Link
                  href={logo.link}
                  key={logo.key}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={logo.src}
                    src={logo.src}
                    alt={logo.key}
                    className="h-16 sm:h-8 md:h-12 transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </Link>
              ))}
            </div>

            <hr className="border-t border-black mb-12" />

            {/* ========================= */}
            {/*   KATEGORI KERUSAKAN     */}
            {/* ========================= */}
            <h2 className="text-center text-2xl font-extrabold text-[#108ee9] mb-6">
              SILAHKAN PILIH KATEGORI KERUSAKAN
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mb-16">
              {listServices.map((cat: any, index: number) => (
                <Link
                  key={cat.alt}
                  href={cat.link}
                  className="flex flex-col align-middle justify-center items-center text-center"
                >
                  <img
                    src={cat.src}
                    className="mx-auto mb-3 w-max h-max cursor-pointer shadow-md hover:shadow-xl hover:scale-105 rounded-xl p-4 border transition-transform"
                    alt={cat.alt}
                    key={cat.alt}
                  />

                  <button
                    onClick={() => router.push(cat.link)}
                    className="flex justify-center items-center gap-2 cursor-pointer mt-4 bg-[#f5222d] hover:bg-[#cf1322] hover:scale-105 text-white w-1/2 text-sm px-3 py-1 rounded-full"
                  >
                    DETAIL <IoIosArrowForward />
                  </button>
                </Link>
              ))}
            </div>

            <hr className="border-t border-black mb-12" />

            {/* ========================= */}
            {/*     CARA SERVICE VIDEO    */}
            {/* ========================= */}
            <h2 className="text-center text-2xl font-bold text-blue-700 mb-8">
              CARA MELAKUKAN SERVICE
            </h2>

            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-3xl h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="315"
                  src="https://youtube.com/embed/N4DxMO1825U"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* ========================= */}
            {/*     LANGKAH SERVICE       */}
            {/* ========================= */}

            <ol className="flex flex-col items-center justify-center text-black text-lg font-bold">
              <li>
                1. Lakukan Konsultasi terkait kerusakan dan minta Price List di
                Nomor WhatsApp dibawah:
              </li>

              <div className="flex justify-center mb-1">
                <Link
                  href={"https://wa.link/3oxvb8"}
                  key={"wa-redirect"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={"wa-numbers"}
                    src={"/images/assets/wa_number.png"}
                    alt="wa-numbers"
                    className="h-16 mt-2 sm:h-8 md:h-12 transition-transform duration-300 hover:scale-110 cursor-pointer"
                  />
                </Link>
              </div>

              <li>
                2. Setelah Melakukan Konsultasi dan Pengiriman, Barang akan
                diproses sesuai antrian.
              </li>
              <li>
                3. Setelah Selesai dilakukan Service, Customer akan dihubungi
                untuk konfirmasi Pengiriman Kembali.
              </li>
              <li>
                4. Customer dapat melacak paket yang dikirim melalui Layanan
                Ekspedisi yang dipakai.
              </li>
            </ol>

            {/* ========================= */}
            {/*   KETENTUAN SERVICE       */}
            {/* ========================= */}
            <Image
              src={"/images/assets/TEXT_Ketentuan.png"}
              alt={"MAIN_BANNER"}
              className="cursor-pointer object-cover mt-4 hover:scale-105 transition-transform duration-500 bg-gray-200"
              // height={300}
              fallback="data:image/png;base64,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"
              preview={false}
            />

            <hr className="border-t border-black mt-4 mb-5" />

            <Image
              src={"/images/assets/TEXT_System_Service.png"}
              alt={"MAIN_BANNER"}
              className="cursor-pointer object-cover hover:scale-105 transition-transform duration-500 bg-gray-200"
              // height={300}
              fallback="data:image/png;base64,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"
              preview={false}
            />

            <hr className="border-t border-black mt-5" />
          </div>
        </div>
        {/* <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(service ?? []).map((item: any) => (
              <ServiceCard key={item.id} item={item} loading={loading} />
            ))}
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
        )} */}
      </section>
    </>
  );
}
