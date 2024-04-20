import logo from './logo.svg';
import './App.css';
import Projects from './components/projects/Projects';
import Header from './components/layout/header/header';
import { useState } from 'react';
import { CssBaseline, Container, makeStyles } from '@mui/material';
import Header_Sidebar from './components/layout/header/header';
import Footer from './components/layout/footer/footer';
import FileViewer from './components/projects/fileViewer/FileViewer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`App ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {/* <Header_Sidebar toggleSidebar={toggleSidebar} /> */}
      {/* <Projects /> */}
      {/* <Footer /> */}
      {/* <FileViewer/> */}
      <Router>
        <Switch>
          <Route exact path="/" component={Projects} />
          <Route path="/file" component={FileViewer} />
        </Switch>
       </Router>
    </div>
  );
}

export default App;
