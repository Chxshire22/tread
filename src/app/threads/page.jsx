"use client";

import React from "react";
import HeadThread from "@/components/Threads/HeadThread";
import Link from "next/link";
import { useState } from "react";

export default function page() {
  const headThread = {
    id: 1,
    title: "EOY Trip with Family",
    destination: "Japan",
    startDate: "Dec 2023",
    endDate: "Jan 2024",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ margin: "1rem" }}>Profile Stuff</h1>
      <Link href="threads/1">
        <HeadThread content={headThread} />
      </Link>
    </div>
  );
}
