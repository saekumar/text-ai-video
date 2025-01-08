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
import { MultiStepLoader as Loader } from '../../../../components/ui/multi-step-loader'
import { Button } from '@/components/ui/button'
const loadingStates = [
  {
    text: 'Initializing Script',
  },
  {
    text: 'Creating Script',
  },
  {
    text: 'Creating Images',
  },
  {
    text: 'Creating Audio',
  },
  {
    text: 'Merging Media',
  },
  {
    text: 'Processing Video',
  },
  {
    text: 'Completing',
  },
  {
    text: 'Done',
  },
]
const LoadingComponent = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="w-full border-black border-2 bg-background">
        <Loader
          loading={loading}
          loadingStates={loadingStates}
          duration={2000}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default LoadingComponent
