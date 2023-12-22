import Head from "next/head";
import Link from "next/link";
import Card from "~/Components/Card";
import Navbar from "~/Components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Card/>
    </div>
  );
}
