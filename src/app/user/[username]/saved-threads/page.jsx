import SavedThreads from "@/components/SavedThreads"

export default function page({params}) {
  return (
    <div>
      <SavedThreads username={params.username}/>
    </div>
  )
}
