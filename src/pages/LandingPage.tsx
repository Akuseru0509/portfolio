import Background from "../components/Background";
import Header from "../components/Header";
import MainLayout from "../layout/MainLayout";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen">
      <Background />
      <Header></Header>
      <MainLayout />
    </div>
  );
}
