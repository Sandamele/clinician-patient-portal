import fireApp from "@/lib/firebase.config";
import { getAuth } from "firebase/auth";
const auth = getAuth(fireApp);
export default auth;
