type HeadingProps = {
    children: any,
    level: number
}

export default function Heading({ children, level }: HeadingProps) {
    switch (level) {
        case 1:
            return <h1 id={children} className="text-white-100 text-20 font-semibold pb-24px relative before:absolute before:-pt-32px before:content-[url('/doc-icons/hashtag.svg')">{children}</h1>
        case 2:
            return <h2 id={children} className="text-white-100 text-16 font-semibold pb-16px pt-40px">{children}</h2>
        case 3:
            return <h3 id={children} className="text-white-100 text-14 font-semibold pb-16px pt-40px">{children}</h3>
        case 4:
            return <h4 id={children} className="text-white-100 text-12 font-semibold pb-16px pt-40px">{children}</h4>
        case 5:
            return <h5 id={children} className="text-white-100 text-12 font-semibold pb-16px pt-40px">{children}</h5>
        case 6:
            return <h6 id={children} className="text-white-100 text-10 font-semibold pb-16px pt-40px">{children}</h6>
        default:
            <div id={children} className="text-white-100 text-12 font-semibold pb-16px pt-40px">{children}</div>
    }
}