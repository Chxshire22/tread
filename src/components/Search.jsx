"use client";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { GeoAltFill, PersonCircle } from "react-bootstrap-icons";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const searchParams = useSearchParams();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/search/${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      return { error: true, msg: error.message };
    }
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          size={40}
        />
        <br />
        <button className="btn btn-primary search-btn" type="submit">
          Search
        </button>
      </form>
      <div className="search-results">
        <div>
          {results.users?.map((user) => (
            <a href={`/user/${user.username}`} key={user.id}>
              <p className="thread-username">
                <PersonCircle className="personcircle" size={20} />
                {""}
                {user.username}
              </p>
            </a>
          ))}
        </div>
        <div>
          {results.threads?.map((thread) => (
            <div key={thread.id} className="sr-container">
              <div className="sr-thread">
                <GeoAltFill className="GeoAlt" />
                {thread.destination}
              </div>
              <div className="sr-p">
                <span>by</span>
                <div className=" thread-username">
                  {" "}
                  <PersonCircle className="personcircle" size={20} />
                  User {thread.userId}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          {results.threadsContents?.map((threadsContent) => (
            <div key={threadsContent.id} className="sr-container">
              <div className="sr-threadcontent">"{threadsContent.location}"</div>
              <div className="sr-p">
                <span>by</span>
                <div className=" thread-username">
                  {" "}
                  <PersonCircle className="personcircle" size={20} />
                  User {threadsContent.Thread.userId}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
