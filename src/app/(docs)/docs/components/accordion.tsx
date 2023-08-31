type AccordionProps = {
	title: string;
	children: any;
};

export default function Accordion({ title, children }: AccordionProps) {
	return (
		<details>
			<summary>{title}</summary>
			<div>{children}</div>
		</details>
	);
}
