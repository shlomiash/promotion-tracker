
export default async  function NotAdminError() {
    return (
        <div className="flex items-center justify-center pt-28">
            <h1 className="text-3xl font-bold text-center">Only admins can access this information</h1>
        </div>
    )
}