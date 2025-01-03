import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="h-full w-80">
      <SignIn />
    </div>
  )
}
