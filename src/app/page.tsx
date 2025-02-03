import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-4xl md:text-6xl font-bold">
        <Image src="/spendlog_logo.svg" alt="Spend Log" width={100} height={100} />
      </div>
    </div>
  );
}
