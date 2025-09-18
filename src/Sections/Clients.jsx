import { clientReviews } from "../constants/index.js";

const Clients = () => {
  return (
    <section className="relative py-20 c-space">
      <h3 className="head-text  mb-14">
        Hear from{" "}
        <span className="bg-gradient-to-r from-green-400 to-lime-500 bg-clip-text text-transparent">
          My Clients
        </span>
      </h3>

      {/* 2x2 Grid Layout */}
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2">
        {clientReviews.slice(0, 4).map((item) => (
          <div
            key={`review-${item.id}`}
            className="relative group bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
          >
            {/* Gradient overlay effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-green-400/20 to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10 flex flex-col justify-between h-full">
              <p className="text-gray-200 font-light leading-relaxed mb-6">
                “{item.review}”
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-full border border-white/20 shadow-md object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.position}</p>
                  </div>
                </div>

                {/* Star ratings */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <img
                      key={index}
                      src="/assets/star.png"
                      alt="star"
                      className="w-5 h-5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
