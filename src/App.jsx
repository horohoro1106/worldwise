import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { Pricing } from "./pages/Pricing/Pricing";
import { Product } from "./pages/Product/Product";
import { Login } from "./pages/Login/Login";
import { AppLayout } from "./pages/AppLayout/AppLayout";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { CityList } from "./components/CityList/CityList";
import { City } from "./components/City/City";
import { CountryList } from "./components/CountryList/CountryList";
import { Form } from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import { ProtectedRoute } from "./pages/ProtectedRoute/ProtectedRoute";

export function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
