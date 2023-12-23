import Card from "~/Components/Card";
import { TaskProvider } from "~/Components/Context";
import Navbar from "~/Components/Navbar";

export default function Home() {
  return (
    <div>
      <TaskProvider>
      <Navbar/>
      <Card/>
      </TaskProvider>
      
    </div>
  );
}
