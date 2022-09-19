import Image from 'next/image'

export function KicktrackerLogo() {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            height={40}
            width={40}
            src="/images/kicktracker.svg"
            alt="Kicktracker logo"
          />
          <span className="mt-2 font-title text-2xl text-kt-primary">
            Kicktracker
          </span>
        </div>
      </div>
      <div className="text-lg font-extrabold text-blue-gray-200">
        Your Crowdfunding Filter
      </div>
    </div>
  )
}
