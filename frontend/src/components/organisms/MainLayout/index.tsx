import type {MainLayoutProps} from "./types.ts";
import Header from "../Header";

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="main-layout">
            <Header />

            <main className="main-layout__container">{children}</main>
        </div>
    );
}