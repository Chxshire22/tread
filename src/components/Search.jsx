"use client";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <p>Users: </p>
        {results.users?.map((user) => (
          <p key={user.id}>{user.username}</p>
        ))}
      </div>
      <div>
        <p>Threads: </p>
        {results.threads?.map((thread) => (
          <p key={thread.id}>
            {thread.destination} - Posted by User {thread.userId}
          </p>
        ))}
      </div>
      <div>
        <p>Threads Content: </p>
        {results.threadsContents?.map((threadsContent) => (
          <p key={threadsContent.id}>
            {threadsContent.location} - Posted by User{" "}
            {threadsContent.Thread.userId}
          </p>
        ))}
      </div>
    </div>
  );
}
