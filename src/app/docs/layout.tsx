import { LayoutProvider } from './(components)/layoutWrapper';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
	return <LayoutProvider>{children}</LayoutProvider>;
}
