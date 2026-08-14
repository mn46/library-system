import React, { useState } from "react";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav>
      {/* desktop */}
      <ul className="hidden md:flex flex-row gap-5 bg-blue-400 px-5 py-3 justify-between">
        <div>
          <li>
            <a href="/" className="uppercase font-bold text-2xl text-white">
              library
            </a>
          </li>
        </div>

        <div className="flex flex-row gap-5 items-center text-white font-semibold">
          <li>
            <a href="/">All books</a>
          </li>
          <li>
            <a href="/my-books">My books</a>
          </li>
          <li>
            <a href="/login" className="button-white-secondary">
              Log in
            </a>
          </li>
          <li>
            <a href="/sign-up" className="button-white">
              Sign up
            </a>
          </li>
        </div>
      </ul>

      {/* mobile */}
      <ul className="md:hidden flex flex-row gap-5 bg-blue-400 px-5 py-3 justify-between">
        <div>
          <li>
            <a href="/" className="uppercase font-bold text-2xl text-white">
              library
            </a>
          </li>
        </div>

        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? (
            <FontAwesomeIcon icon={faX} color="white" />
          ) : (
            <FontAwesomeIcon icon={faBars} color="white" />
          )}
        </button>

        {isOpen && (
          <div className="fixed top-14 left-0 w-screen h-[88vh] bg-white flex flex-col justify-center items-center gap-5">
            <li>
              <a href="/">All books</a>
            </li>
            <li>
              <a href="/my-books">My books</a>
            </li>
            <li>
              <a href="/login">Log in</a>
            </li>
            <li>
              <a href="/sign-up">Sign up</a>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
