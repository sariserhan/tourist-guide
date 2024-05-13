// slug page

type paramsProps = {
  slug: string
}

export default function Component({params}: {params: paramsProps}) {
  return (
    <div className="flex min-h-screen flex-col mt-20">
        TEST {params.slug}
    </div>
  )
}
