import AdminLayout from "../layouts/AdminLayout";

export default function Settings() {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Settings
        </h1>

        <div className="bg-white rounded-xl shadow p-8 max-w-3xl">

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Company Name
            </label>

            <input
              type="text"
              defaultValue="Kryson Life Science"
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Admin Email
            </label>

            <input
              type="email"
              defaultValue="admin@kryson.com"
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Change Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Save Settings
          </button>

        </div>
      </div>
    </AdminLayout>
  );
}