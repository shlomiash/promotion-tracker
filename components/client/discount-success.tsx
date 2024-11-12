import { CheckCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert"


export default function DiscountSuccess({message}:{message:string|null}) {

    if(!message) return null;
    return <Alert variant="default" className="bg-green-300 mt-2">
    <CheckCircle className="h-4 w-4" />
    <AlertDescription>
      {message}
    </AlertDescription>
  </Alert>;

}