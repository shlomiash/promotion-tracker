export default function WelcomeMessage({message}:{message:string}){
    return (
        <div className="w-full flex justify-center items-center h-24 bg-gradient-to-r from-green-400 to-blue-500 mb-8">
            <h1 className="text-lg md:text-3xl text-white uppercase">{message}</h1>
        </div>
    )
}