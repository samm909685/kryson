import logo from "../assets/images/logo.png";

function Loader() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[9999]">
      <img
        src={logo}
        alt="Kryson Logo"
        className="w-32 mb-6 animate-pulse"
      />

      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-blue-800 font-semibold text-lg">
        Loading Kryson Life Science...
      </p>
    </div>
  );
}

export default Loader;