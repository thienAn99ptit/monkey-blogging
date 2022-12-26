import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { privaryRoute } from "./routes/Routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { AuthProvider } from "./contexts/auth-context";
import AuthenticationLayout from "./layouts/AuthenticationLayout/AuthenticationLayout";
import DashboardLayout from "./layouts/dashboardLayouts/DashboardLayouts";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="overflow-hidden">
          <Suspense fallback={<></>}>
            <Routes>
              {privaryRoute.map((route, index) => {
                let Layout = DefaultLayout;
                const Page = route.element;
                if (route.layout === "primary") Layout = AuthenticationLayout;
                else if (route.layout === "dashboard") Layout = DashboardLayout;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  ></Route>
                );
              })}
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
