// REACTS
import { Image } from "antd";
import Link from "next/link";

// CODE
const HeroBanner = () => {
  return (
    <section
      className="flex justify-center relative bg-cover bg-center text-white w-full h-full py-20 px-6 overflow-hidden"
      // style={{
      //   backgroundImage: "url('/images/assets/BACKGROUND.png')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   margin: "22px 0px 0px",
      // }}
    >
      <div
        // className="flex flex-wrap justify-between container mx-auto px-6 py-32 items-center"
        className="flex flex-wrap md:flex-nowrap sm:flex-nowrap justify-between items-center container mx-auto relative"
        style={{
          backgroundImage: "url('/images/assets/BACKGROUND.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "22px 0px 0px",
        }}
      >
        <div className="grid grid-cols-1 w-xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 px-4">
          <div className="order-1 md:order-1 sm:order-1 space-y-6 flex-1 text-center md:text-left">
            <div className="flex justify-center">
              <Image
                src="/images/assets/ServiceLogo.png"
                alt="Logo"
                height={150}
                width={150}
                preview={false}
              />
            </div>

            <h4
              className="font-extrabold leading-tight 
            text-white bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400
            text-[clamp(1.2rem,3vw,2rem)]"
            >
              YHUSAN DIGITAL <br />
              <span className="text-blue-300">TWS AUDIO SPECIALIST</span>
            </h4>
            <p className="text-left text-[clamp(0.9rem,2vw,1.3rem)] max-w-md md:mx-0">
              Perbaikan TWS yang rusak dengan part original dan kualitas
              terbaik.
            </p>

            {/* Tombol */}
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link
                href="/services"
                className="hover:scale-105 rounded-full transition-transform duration-300"
                style={{
                  backgroundImage: "url('/images/assets/blackservicetws.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "clamp(150px, 22vw, 250px)",
                  height: "clamp(50px, 10vw, 90px)",
                  display: "inline-block",
                }}
              ></Link>

              <Link
                href="/products"
                className="rounded-full hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: "url('/images/assets/belisparepart.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "clamp(140px, 20vw, 220px)",
                  height: "clamp(45px, 7vw, 70px)",
                  display: "inline-block",
                }}
              ></Link>
            </div>
          </div>

          <div className="order-3 md:order-3 sm:order-3 gap-3 mt-10 md:mt-0">
            <div className="w-full flex flex-col justify-end items-end w-xs:justify-center sm:justify-center">
              <Link
                href="/services"
                className="hover:scale-105 rounded-full transition-transform duration-300"
                style={{
                  backgroundImage: "url('/images/assets/Service_Button1.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "clamp(250px, 42vw, 350px)",
                  height: "clamp(75px, 15vw, 120px)",
                  display: "inline-block",
                }}
              ></Link>

              <Link
                href="/services"
                className="rounded-full hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: "url('/images/assets/Service_Button2.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "clamp(250px, 42vw, 350px)",
                  height: "clamp(75px, 15vw, 120px)",
                  display: "inline-block",
                }}
              ></Link>

              <Link
                href="/services"
                className="rounded-full hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: "url('/images/assets/Service_Button3.png')",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "clamp(250px, 42vw, 350px)",
                  height: "clamp(75px, 15vw, 120px)",
                  display: "inline-block",
                }}
              ></Link>
            </div>
          </div>

          <div className="order-2 md:order-2 sm:order-2 flex justify-center md:justify-end flex-1 mt-10 md:mt-0">
            <Image
              src="/images/assets/owner.png"
              alt="Owner"
              height={500}
              width={500}
              preview={false}
              className="object-bottom md:object-bottom w-auto h-auto md:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );

  /* 
    <section
      // className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-20 px-6"
      // <div
      className="bg-cover bg-center m-auto py-60 px-96 text-white w-full h-full"
      style={{
        backgroundImage: "url('/images/assets/MainImages.png')",
        width: "100%",
        height: "100%",
      }}
    >
    <div className="container mx-auto py-4 px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
    <div className="absolute bottom-80 left-45 flex gap-4 z-10">
          <Link
            href="/explore"
            className="border-2 border-blue-400 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition"
          >
            Service TWS
          </Link>

          <Link
            href="https://youtube.com/"
            target="_blank"
            className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-amber-300 hover:text-blue-800 transition"
          >
            Sparepart TWS
          </Link>
        </div>

        {/* <div className="flex gap-8">
          <Link
            href="/explore"
            className="border border-indigo-500 text-white px-6 py-2 hover:bg-blue-600 transition rounded-4xl z-40"
            style={{
              cursor: "pointer",
              backgroundImage: "url('/images/assets/D:\next\tws-app\public\images\assets\CTA_SERVICE_TWS.png')",
              width: "100%",
              height: "100%",
            }}
          >
            Service TWS
          </Link>

          <Link
            href="https://youtube.com/"
            target="_blank"
            className="bg-indigo-600 text-white px-6 py-2 hover:bg-amber-50 hover:text-blue-500 transition rounded-4xl z-40"
            style={{
              cursor: "pointer",
              backgroundImage: "url('/images/assets/CTA_belisparepart.png')",
              width: "100%",
              height: "100%",
            }}
            >
            Sparepart TWS
          </Link>
          </div> */
};

{
  /* Image Carousel (static for now) */
}
{
  /* <div className="relative w-full h-72 md:h-96">
          <div className="absolute inset-0 animate-slide">
            <Image
            src="/images/banner-01.png"
            alt="NFT Banner 1"
              fill
              className="object-contain"
            />
          </div>
        </div> 
      </div>
    </section>
    */
}

export default HeroBanner;
