import { Checkbox } from "./ui/checkbox"

const InterestedCheckbox = ({country}: {country: string}) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        checked={false}
        onChange={(country) => {}}
        id="interested-checkbox" />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor="interested-checkbox"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Follow
        </label>
        <p className="text-sm text-muted-foreground">
          Add country to
        </p>
      </div>
    </div>
  )
}

export default InterestedCheckbox
