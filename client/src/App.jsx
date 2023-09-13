import MessageBoard from "./components/MessageBoard";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen flex flex-col bg-purple-50">
      <MessageBoard />
      <Footer />

      <i className="absolute top-10 left-10 text-[150px] text-purple-100 fa-regular fa-comments"></i>
      <i className="absolute bottom-20 right-20 text-[150px] text-purple-100 fa-solid fa-comment-dots"></i>
    </div>
  );
}

export default App;
