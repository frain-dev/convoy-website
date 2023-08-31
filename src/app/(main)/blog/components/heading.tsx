type HeadingProps = {
    children: any,
    level: number
}

export default function Heading({ children, level }: HeadingProps) {
    switch (level) {
        case 1:
            return <h1 id={children} className="text-gray-800 tracking-[.01em] text-30 font-bold mb-12px">{children}</h1>
        case 2:
            return <h2 id={children} className="text-gray-800 tracking-[.01em] text-24 font-semibold mb-12px">{children}</h2>
        case 3:
            return <h3 id={children} className="text-gray-800 tracking-[.01em] text-20 font-semibold mb-12px">{children}</h3>
        case 4:
            return <h4 id={children} className="text-gray-800 tracking-[.01em] text-18 font-semibold mb-12px">{children}</h4>
        case 5:
            return <h5 id={children} className="text-gray-800 tracking-[.01em] text-16 font-semibold mb-12px">{children}</h5>
        case 6:
            return <h6 id={children} className="text-gray-800 tracking-[.01em] text-14 font-semibold mb-12px">{children}</h6>
        default:
            <div id={children} className="text-gray-800 tracking-[.01em] text-16 font-semibold mb-12px">{children}</div>
    }
}