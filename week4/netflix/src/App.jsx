

import Footer from "./component/Footer";
import Nav from "./component/nav";
import Questions from "./component/Questions";
import Reasons from "./component/Reasons";
import Subscription from "./component/Subscription";
import Trends from "./component/Trends";


const App = () => {
  return (
    <div className="bg-black px-30 text-white">
      <Nav />
      <Trends/>
      <Reasons />
      <Questions />
      <Subscription/>
      <Footer />
    </div>
  );
};

export default App;
