import qualityImg from "../assets/images/quality.png";

function Quality() {
  return (
    <section className="py-20 px-8 bg-blue-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-blue-900 mb-14">
          Quality Assurance
        </h2>

        <img
          src={qualityImg}
          alt="Quality"
          className="w-full rounded-2xl shadow-xl"
        />
      </div>
    </section>
  );
}

export default Quality;
console.log("QUALITY FILE RUNNING");