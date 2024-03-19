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
            <a key={thread.id} className="sr-container" href={`/threads/${thread.id}`}>
              <div className="sr-thread">
                <GeoAltFill className="GeoAlt" />
                {thread.destination}
              </div>
              <div className="sr-p">
                <span>by</span>
                <div className=" thread-username">
                  {" "}
                  <PersonCircle className="personcircle" size={20} />
                  {thread.User.username}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div>
          {results.threadsContents?.map((threadsContent) => (
            <a
              key={threadsContent.id}
              className="sr-container"
              href={`/threads/${threadsContent.Thread.id}/${threadsContent.id}`}
            >
              <div className="sr-threadcontent">&quot;{threadsContent.location}&quot;</div>
              <div className="sr-p">
                <span>by</span>
                <div className=" thread-username">
                  {" "}
                  <PersonCircle className="personcircle" size={20} />
                  {threadsContent.Thread.User.username}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div>
          {results.users?.length === 0 &&
          results.threads?.length === 0 &&
          results.threadsContents?.length === 0 ? (
            <p>There seems to be no matching search results..</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
