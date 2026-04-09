import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
    title: "Campus News",
    description: "Stay updated with the latest campus news and events.",
};

/*
* RootLayout component that defines the overall layout of the application.
*/

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}