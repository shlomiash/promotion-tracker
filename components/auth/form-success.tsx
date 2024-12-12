import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default function FormSuccess({message} : {message: string|null}) {
    
    if(!message) return null;

  return (
    <Alert variant="default" className="bg-green-300 mt-4">
      <AlertCircle className="h-4 w-4 " />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
}