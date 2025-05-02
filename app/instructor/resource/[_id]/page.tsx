import { fetchAllResources } from "@/services/sanity"
import { SanityAssetDocument } from "@sanity/client"
import ResourceDetail from "./ResourceDetail"


export async function generateStaticParams() {
  const resources = await fetchAllResources() as SanityAssetDocument[]

  return resources.map((resource) => ({
    _id: resource._id
  }))
}

export default async function ResourceDetails({params}: {params: Promise<{_id: string}>}) {

  const {_id} = await params

  const resource = await fetchAllResources(_id)

  return (
    <>
      {resource ? (
        <ResourceDetail resource={resource} />
      ) : (
       <p>No resource found</p> 
      )}
    </>
  )
}
