// import React from 'react';

const Content = () => {
  const suppliers = [
    {
      name: "Joe's Coffee",
      details: "1234 | Joe's Coffee | 123-456-7890",
      image: "https://cdn.usegalileo.ai/sdxl10/11f26302-6135-44fb-83ba-12b9bc1cec67.png",
    },
    {
      name: "Jane's Coffee",
      details: "1235 | Jane's Coffee | 123-456-7890",
      image: "https://cdn.usegalileo.ai/sdxl10/65941351-7663-4ae0-a690-bf4fd4aa325e.png",
    },
    {
      name: "Jack's Coffee",
      details: "1236 | Jack's Coffee | 123-456-7890",
      image: "https://cdn.usegalileo.ai/sdxl10/053d8913-3c91-4627-bc29-90c31a21aaa2.png",
    },
  ];

  return (
    <div className="layout-content-container flex flex-col w-80 px-6 py-5">
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#887563] flex border-none bg-[#f4f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              </svg>
            </div>
            <input
              placeholder="Search for suppliers..."
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f4f2f0] focus:border-none h-full placeholder:text-[#887563] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
            />
          </div>
        </label>
      </div>
      {suppliers.map((supplier, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2"
        >
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
            style={{ backgroundImage: `url(${supplier.image})` }}
          ></div>
          <div className="flex flex-col justify-center">
            <p className="text-[#181411] text-base font-medium leading-normal line-clamp-1">
              {supplier.name}
            </p>
            <p className="text-[#887563] text-sm font-normal leading-normal line-clamp-2">
              {supplier.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
