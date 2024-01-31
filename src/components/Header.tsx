import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="top-0 z-40 mx-auto max-w-screen-7xl md:sticky md:top-4">
      <nav>
        <ul>
          <li>
            <Link href="/" aria-label="Home Page">
              {settings.data.name}
            </Link>
          </li>
          {settings.data.navitems.map(({ link, label }, index) => {
            return (
              <li key={index}>
                <PrismicNextLink field={link}>{label}</PrismicNextLink>
              </li>
            );
          })}
          <li></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
