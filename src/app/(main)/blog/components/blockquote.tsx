import Image from "next/image";

type BlockQuoteProps = {
  children: any;
};

export default function BlockQuote({ children }: BlockQuoteProps) {
  return (
    <div className="rounded-10px border border-success-200 bg-success-25 px-24px pt-24px pb-4px my-50px">
      <div className="flex flex-row items-center text-14 text-success-400 mb-8px">
        <Image
          className="mr-8px w-16px h-16px"
          src="/doc-icons/lightbulb.svg"
          alt="lightbulb icon"
          width={16}
          height={16}
          priority
        />
        Pro-Tip
      </div>
      <div className="text-14 text-gray-600">{children}</div>
    </div>
  );
}
