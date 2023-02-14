import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
