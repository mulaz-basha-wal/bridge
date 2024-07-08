import "./app.global.scss";
import { BlurryFloatDot, BridgeForm } from "./components";
import { LANDING_PAGE_DOTS } from "./utils/constants";

function App() {
  return (
    <div>
      {LANDING_PAGE_DOTS.map((dot, index) => {
        return <BlurryFloatDot key={index} top={dot.top} left={dot.left} img={dot.img} />;
      })}
      <div className="flex items-center justify-center min-h-screen">
        <BridgeForm />
      </div>
    </div>
  );
}

export default App;
