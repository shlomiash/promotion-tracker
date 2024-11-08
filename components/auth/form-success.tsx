import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


export default function FormSuccess({message} : {message: string}) {
    
    if(!message) return null;

  return (
    <Alert variant="default" className="bg-green-300">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Incorrect email or password!
      </AlertDescription>
    </Alert>
  );
}