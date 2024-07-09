import React from "react";

export default function TokenSelector({ isModalOpen, children, listLength }) {
  if (isModalOpen !== true) return null;
  return (
    <section className="modal">
      <div className="modal-content p-lg-4 w-[100%] min-w-[400px] lg:w-[400px] sm:w-[400px]">
        {listLength > 0 ? (
          <p className="text-center w-full text-sm my-2">
            Select any one of the available options
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
