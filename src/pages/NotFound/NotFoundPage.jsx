import React from "react";

const NotFoundPage = () => {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--black)] via-gray-900 to-[var(--black)] flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--blue)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--red)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        {/* Film icon animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--blue)]/20 rounded-full blur-xl animate-pulse"></div>
          </div>
        </div>

        {/* 404 Text */}
        <div className="mb-6">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[var(--blue)] via-[var(--yellow)] to-[var(--red)] bg-clip-text text-transparent mb-4 animate-pulse">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-[var(--blue)] to-[var(--red)] mx-auto rounded-full"></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--white)] mb-4">
          Oops! Phim không tìm thấy
        </h2>
        <p className="text-lg text-[var(--white)]/60 mb-12 max-w-md mx-auto">
          Có vẻ như trang bạn đang tìm kiếm đã bị xóa hoặc không tồn tại. Hãy
          thử quay lại trang chủ nhé!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoBack}
            className="group px-8 py-4 rounded-xl bg-[var(--white)]/5 text-[var(--white)] hover:bg-[var(--white)]/10 transition-all duration-300 border border-[var(--white)]/10 hover:border-[var(--white)]/30 flex items-center justify-center gap-2 font-semibold"
          >
            Quay lại
          </button>

          <button
            onClick={handleGoHome}
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--blue)] to-[var(--blue)]/80 text-[var(--white)] hover:shadow-lg hover:shadow-[var(--blue)]/30 transition-all duration-300 flex items-center justify-center gap-2 font-semibold hover:scale-105 transform"
          >
            Về trang chủ
          </button>
        </div>

        {/* Decorative film strip */}
        <div className="mt-16 flex justify-center gap-2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-12 h-16 border-2 border-[var(--white)] rounded-sm"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
