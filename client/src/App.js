import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PostsProvider } from "./contexts/PostsContext";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import Dashboard from "./components/views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import ChooseAccount from "./components/auth/ChooseAccount";
import Trash from "./components/posts/Trash";
import Starred from "./components/posts/Starred";
import Search from "./components/posts/Search";
import InsideFolders from "./components/views/InsideFolders";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <PostsProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}
            ></Route>
            <Route
              exact
              path="/register"
              render={(props) => <Auth {...props} authRoute="register" />}
            ></Route>
            <ProtectedRoute
              exact
              path="/choose-account"
              component={ChooseAccount}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/starred"
              component={Starred}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/trash"
              component={Trash}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/dashboard/search"
              component={Search}
            ></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/dashboard/folder/:id"
              component={InsideFolders}
            ></ProtectedRoute>
          </Switch>
        </Router>
      </PostsProvider>
    </AuthProvider>
  );
}

export default App;
