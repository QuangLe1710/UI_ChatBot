import "./App.css";
import MainLayout from "./layouts/MainLayout";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    return <>
        <div className="h-screen">
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<ChatPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    </>
}

export default App;
