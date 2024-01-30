import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";

import { CityList } from "./components/CityList/CityList";
import { City } from "./components/City/City";
import { CountryList } from "./components/CountryList/CountryList";
import { SpinnerFullPage } from "./components/SpinnerFullPage/SpinnerFullPage";
import { Form } from "./components/Form/Form";
/* 
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { Homepage } from "./pages/Homepage/Homepage";
import { Pricing } from "./pages/Pricing/Pricing";
import { Product } from "./pages/Product/Product";
import { Login } from "./pages/Login/Login";
import { AppLayout } from "./pages/AppLayout/AppLayout"; */
//Lazy loading implementation, this pages will be loaded only if they will be needed
const PageNotFound = lazy(() =>
  import("./pages/PageNotFound/PageNotFound.jsx")
);
const Homepage = lazy(() => import("./pages/Homepage/Homepage.jsx"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing.jsx"));
const Product = lazy(() => import("./pages/Product/Product.jsx"));
const Login = lazy(() => import("./pages/Login/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout.jsx"));

export function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="product" element={<Product />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
