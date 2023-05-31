// React
import { Route, Routes } from "react-router-dom";
// Components
import { Layout } from "./Components/Layout";
// Pages
import { Home } from "./Pages/Home";
import { MealSingle } from "./Pages/MealSingle";
import { NotFound } from "./Pages/NotFound";
function App() {

  return (
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/:id" element={<MealSingle/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Route>
    </Routes>
  )
}

export default App
