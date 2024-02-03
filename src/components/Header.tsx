import React from "react";
import { createClient } from "@/prismicio";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import NavBar from "./Navbar";

async function Header() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return (
    <header className="max-w-screen-7xl top-0 z-40 mx-auto md:sticky md:top-4">
      {/* <nav>
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
      </nav> */}
      <NavBar settings={settings}></NavBar>
    </header>
  );
}

export default Header;
