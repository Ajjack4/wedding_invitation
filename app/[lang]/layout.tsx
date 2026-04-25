export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'mar' }]
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
