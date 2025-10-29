import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import ToastProvider from "../contexts/ToastContext"
import Sider from "../components/sider/Sider";
import { ChatProvider } from "../contexts/ChatContext";


const { Header , Content } = Layout;

export default function MainLayout() {
    return (
        <ToastProvider>
            
            <ChatProvider>

                <Layout hasSider className="h-screen">
                <Sider/>
                <Layout>
                    <Header className="bg-[#ffffff]!">
                        <div className={`flex items-center h-full`}>
                            <h1 className="text-3xl">
                                <span className="font-bold mr-1.5">U+ BIZ</span> 
                            </h1>
                        </div> 
                    </Header>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>

            </ChatProvider>

        </ToastProvider>
    );
}
