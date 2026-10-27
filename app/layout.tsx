import "./styles.css";
import type {ReactNode} from "react";
export const metadata={title:"FitReceipt",description:"A consent-based garment try-on with explicit image handling and a reviewable task record."};
export default function Layout({children}:{children:ReactNode}){return <html lang="en"><body className="lab">{children}</body></html>;}
