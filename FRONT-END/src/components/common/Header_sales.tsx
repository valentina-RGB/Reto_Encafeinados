// import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f2f0] px-10 py-3">
      <div className="flex items-center gap-4 text-[#181411]">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">Acme Coffee</h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          {['Dashboard', 'Orders', 'Consignment', 'Inventory', 'Reports', 'Settings'].map((item) => (
            <a key={item} href="#" className="text-[#181411] text-sm font-medium leading-normal">
              {item}
            </a>
          ))}
        </div>
        <div className="flex gap-2">
          {['MagnifyingGlass', 'Bell', 'UserCircle'].map((icon, index) => (
            <button
              key={index}
              className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#f4f2f0] text-[#181411] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5"
            >
              <div className="text-[#181411]" data-icon={icon} data-size="20px" data-weight="regular">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20px"
                  height="20px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M...Z" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
