import React from "react";
import Slider from "react-slick";

export default function FeatureProducts({ list }) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
  };
  return (
    <div className="w-full p-16 font-poppins">
      <p className="w-full text-center text-[3em] my-8 font-bold">
        FEATURED PRODUCTS
      </p>
      <Slider {...settings}>
        {list.map((item) => {
          return (
            <>
              <div className="w-full h-full flex items-stretch justify-end py-8">
                <div className="w-1/2 flex flex-col justify-between p-8">
                  <div className="flex flex-col items-start gap-2">
                    <p className="font-light">{item.brand}</p>
                    <p className="text-[3em] font-semibold h-[3em] leading-[3rem] overflow-hidden">
                      {item.name}
                    </p>
                  </div>
                  <p className="w-5/6 text-xs opacity-70 hidden md:block">
                    {item.description}
                  </p>
                  <button
                    onClick={() =>
                      window.location.replace(`/product/${item.id}`)
                    }
                    className="w-3/4 font-light text-xl bg-black text-white rounded-md py-2 hover:bg-gray-400 hover:text-black duration-300"
                  >
                    View details
                  </button>
                </div>

                <div className="w-1/2">
                  <img src={item.image} alt="" className="w-[30em] mx-auto" />
                </div>
              </div>
            </>
          );
        })}
      </Slider>
    </div>
  );
}
