import {
 Award,
 ShieldCheck,
 Heart,
 Coffee,
 Compass,
 Sparkles,
} from "lucide-react";

const AboutPage = () => {
 const stats = [
 { value: "20+", label: "Phòng" },
 { value: "10+", label: "Năm Hoạt Động" },
 ];

 const values = [
 {
 icon: <Award className="w-8 h-8 text-purple-600" />,
 title: "Sự Tinh Tế",
 desc: "Mọi ngóc ngách của LumiStay đều mang dấu ấn của kiến trúc đương đại kết hợp tinh tế với các đường nét di sản Hà Nội cổ kính.",
 },
 {
 icon: <Heart className="w-8 h-8 text-purple-600" />,
 title: "Tận Tâm Phục Vụ",
 desc: "Đội ngũ nhân viên luôn túc trực 24/7 với tinh thần hiếu khách tối đa, mang đến cho khách lưu trú cảm giác ấm cúng như ở nhà.",
 },
 {
 icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
 title: "Trải Nghiệm An Tâm",
 desc: "An ninh tối đa và tiêu chuẩn vệ sinh đẳng cấp quốc tế, giúp kỳ nghỉ dưỡng của bạn trở nên trọn vẹn và an bình nhất.",
 },
 ];

 return (
 <div className="min-h-screen bg-gray-50 text-slate-800 pt-16">
 {/* ══ HERO BANNER ══ */}
 <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
 <div className="absolute inset-0 z-0">
 <img
 src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600"
 alt="LumiStay Luxury Hotel"
 className="w-full h-full object-cover scale-105 transition-transform duration-1000"
 />
 <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900/90" />
 </div>

 <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
 <p className="text-purple-400 text-xs md:text-sm font-bold tracking-widest mb-3 flex items-center justify-center gap-1.5 animate-fade-in">
 <Sparkles size={14} /> Chào mừng tới LumiStay
 </p>
 <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight mb-5 drop-shadow-md">
 KIẾN TẠO TRẢI NGHIỆM
 <br />
 <span className="bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
 LƯU TRÚ HOÀN HẢO
 </span>
 </h1>
 <p className="text-white/70 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
 Nơi giao thoa giữa nhịp sống đương đại tinh tế và nét đẹp di sản
 lịch sử thủ đô, mang đến cho quý khách một hành trình thư giãn trọn
 vẹn và đẳng cấp.
 </p>
 </div>
 </section>

 {/* ══ OUR STORY ══ */}
 <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 <div className="space-y-6">
 <p className="text-purple-600 text-xs font-bold tracking-wider">
 Câu chuyện của chúng tôi
 </p>
 <h2 className="text-2xl md:text-4xl font-bold text-slate-950 leading-tight">
 KIẾN TRÚC DI SẢN
 <br />
 <span className="text-purple-600">GIAO THOA TIỆN NGHI HƠN</span>
 </h2>
 <p className="text-slate-600 text-sm leading-relaxed">
 Được thành lập với sứ mệnh mang đến không gian nghỉ dưỡng đẳng cấp
 thượng lưu ngay giữa lòng Hà Nội, LumiStay không chỉ là một điểm
 dừng chân mà còn là một tác phẩm nghệ thuật. Mỗi căn phòng được
 thiết kế tỉ mỉ, kết hợp hài hòa giữa nội thất sang trọng tiêu
 chuẩn 5 sao cùng những nét văn hóa truyền thống Việt độc đáo.
 </p>
 <p className="text-slate-600 text-sm leading-relaxed">
 Chúng tôi tin rằng, một dịch vụ lưu trú hoàn hảo bắt nguồn từ sự
 quan tâm thấu đáo tới từng nhu cầu nhỏ nhất của khách hàng. Hãy để
 LumiStay cùng bạn đồng hành và viết nên những kỷ niệm đẹp trong
 suốt khoảng thời gian ghé thăm thủ đô.
 </p>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-2 gap-6 p-8 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-3xl relative overflow-hidden">
 <div className="absolute top-0 right-0 w-24 h-24 bg-purple-200/20 blur-2xl rounded-full" />
 {stats.map((stat, idx) => (
 <div
 key={idx}
 className="bg-white p-6 rounded-2xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow"
 >
 <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">
 {stat.value}
 </p>
 <p className="text-xs text-slate-500 font-bold tracking-wider">
 {stat.label}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* ══ CORE VALUES ══ */}
 <section className="bg-slate-900 text-white py-16 md:py-24 px-6">
 <div className="max-w-7xl mx-auto">
 <div className="text-center max-w-xl mx-auto mb-16 space-y-4">
 <p className="text-purple-400 text-xs font-bold tracking-wider">
 Giá trị cốt lõi
 </p>
 <h2 className="text-2xl md:text-4xl font-bold">
 TRIẾT LÝ HOẠT ĐỘNG
 </h2>
 <div className="w-12 h-1 bg-purple-500 mx-auto rounded-full" />
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {values.map((v, idx) => (
 <div
 key={idx}
 className="bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 p-8 rounded-3xl transition-all duration-300 group flex flex-col items-center text-center"
 >
 <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-lg shadow-purple-900/10 group-hover:scale-110 transition-transform">
 {v.icon}
 </div>
 <h3 className="text-lg font-bold mb-3 text-white">
 {v.title}
 </h3>
 <p className="text-white/60 text-xs md:text-sm leading-relaxed">
 {v.desc}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>
 </div>
 );
};

export default AboutPage;
