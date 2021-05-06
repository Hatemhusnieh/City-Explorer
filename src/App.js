import './App.css';
import React from 'react';
import Main from './components/Main/main';
import Header from './components/Header/header';
import Footer from './components/Footer/footer';

class App extends React.Component {
  render() {
    return (
      <>
        <Header/>
        <Main/>
        <Footer/>
      </>
    );
  }
}

export default App;
