import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const LoadingComponent = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-neutral-600/95">
        <div className="">
          <h2 className="text-gray-950">Loading...</h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default LoadingComponent
