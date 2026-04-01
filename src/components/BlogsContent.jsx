import SectionLayout from './SectionLayout'

export default function BlogsContent() {
  return (
    // Wrap the page content in the shared section layout (consistent title/spacing).
    <SectionLayout titleId="blogs-heading" title="Blogs">
      {/* Short placeholder copy for the Blogs page; replace with your real content. */}
      <p>List articles or link out to your writing here.</p>
    </SectionLayout>
  )
}
