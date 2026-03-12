import React from "react";

const NavbarLinks = ({
    children,
    pageInfo,
    index,
    currentPage,
    onClickFunction,
    pagesLight,
}) => {
    return (
        <div
            className={`group navlink ${pagesLight ? "light" : "dark"
                } ${currentPage === pageInfo ? "opacity-100" : ""} link${index}`}
            onClick={onClickFunction}
        >
            {children}

            <h1
                className="
          absolute 
          left-[75px] 
          whitespace-nowrap 
          opacity-0 
          translate-y-2
          transition-all 
          duration-300 
          pointer-events-none
          group-hover:opacity-100 
          group-hover:translate-y-0
        "
            >
                {pageInfo}
            </h1>
        </div>
    );
};

export default NavbarLinks;
