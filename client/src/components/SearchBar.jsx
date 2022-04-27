import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE } from "../api";
import { motion } from "framer-motion";
import { MdClear as ClearIcon } from "react-icons/md";
import { ImSpinner3 as SpinnerIcon } from "react-icons/im";
import SearchUserItem from "./SearchUserItem";

import { container } from "../constants/varients";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const unsub = async () => {
      setLoading(true);
      const { data } = await axios(`${API_BASE}/api/v1/user/search?q=${query}`);
      if (data.users) {
        setUsers(data.users);
      }
      setLoading(false);
    };
    return () => {
      if (query.length > 0) unsub();
    };
  }, [query]);
  return (
    <motion.div className="my-2 w-full relative">
      <div className="relative">
        <input
          type="text"
          className="w-full border p-1 md:p-3 text-xs md:text-sm md:rounded-none bg-transparent dark:border-gray-500 outline-slate-900 rounded"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="absolute h-full text-xs md:text-lg flex items-center justify-center p-2 aspect-square top-0 right-0"
            onClick={() => setQuery("")}
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {query && (
        <>
          <motion.div
            layout
            className="absolute w-full md:w-[400px] md:left-1 p-2 bg-gray-100 dark:bg-dark-500 overflow-y-scroll translate-y-2 h-[400px] z-10 rounded shadow"
          >
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin ">
                  <SpinnerIcon />
                </div>
              </div>
            ) : (
              <>
                {users?.length > 0 ? (
                  <motion.div
                    variants={container}
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col gap-3"
                  >
                    {users?.map((user) => (
                      <SearchUserItem key={user._id} user={user} />
                    ))}
                  </motion.div>
                ) : (
                  <div className="h-full text-gray-500 dark:text-gray-300 w-full flex items-center justify-center">
                    No results found.
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default SearchBar;
